import csv
from copy import deepcopy
import heapq
import config
from datasketch import WeightedMinHashGenerator
import time
import json
# constants
alpha = 0.7
lambda_ = 100
th = 0.9
decrease_step = 0.05
wmg = WeightedMinHashGenerator(34)
#rrange = 1000

# read the file
result = None
with open('Events08Only.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    result = list(reader)
del (result[0])
# read all sequences
sequences = []
last_id = -1
temp_sequence = None
max_len = 0
for i in result:
    if int(i[0]) > int(last_id):  # new sequence begin
        if temp_sequence is not None and len(temp_sequence) > max_len:
            max_len = len(temp_sequence)
        last_id = int(i[0])
        if temp_sequence is not None:
            sequences.append(temp_sequence)  # add last sequence
        temp_sequence = []
    elif int(i[0]) < int(last_id):
        temp = sequences[int(i[0])]
        if len(temp) == 0 or temp[len(temp) - 1] != i[1]:
            sequences[int(i[0])].append(i[1])
    if len(temp_sequence) == 0 or temp_sequence[len(temp_sequence) - 1] != i[1]:
        temp_sequence.append(i[1])
if len(temp_sequence) > max_len:
    max_len = len(temp_sequence)
sequences.append(temp_sequence)


# calculate edits from sequence(list of string) to list of Events
def edits(s, events):
    len1 = len(s)
    len2 = len(events)
    max_len = 0
    dp = [[0 for col in range(len2)] for row in range(len1)]
    for i in range(len1):
        for j in range(len2):
            if s[i] == events[j].name:
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if i == 0 or j == 0:
                    dp[i][j] = 0
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            if dp[i][j] > max_len:
                max_len = dp[i][j]
    return len1 + len2 - 2 * max_len


# calculate edits from sequence to pattern and update the event frequency and insertions for pattern
def edit_insert(s, pattern):
    events = pattern.events
    len1 = len(s)
    len2 = len(events)
    max_len = 0
    dp = [[0 for col in range(len2)] for row in range(len1)]
    for i in range(len1):
        for j in range(len2):
            if s[i] == events[j].name:
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if i == 0 or j == 0:
                    dp[i][j] = 0
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            if dp[i][j] > max_len:
                max_len = dp[i][j]
    edits = len1 + len2 - 2 * max_len
    i = len1 - 1
    j = len2 - 1
    while True:
        if s[i] == events[j].name:
            pattern.events[j].freq = pattern.events[j].freq + 1
            if i == 0 or j == 0:
                break
            i = i - 1
            j = j - 1
        else:
            if i == 0 or j == 0:
                break
            if dp[i - 1][j] > dp[i][j - 1]:
                # s[i] is need to be inserted at events pos j + 1
                pattern.insert_action(s[i], j + 1)
                i = i - 1
            else:
                j = j - 1
    if i > 0:
        while i >= 0:
            pattern.insert_action(s[i], 0)
            i = i - 1


# calculate LCS for list of events and return the list
def LCS(p1, p2):  # longest common substring, used in merge
    len1 = len(p1)
    len2 = len(p2)
    max_len = 0
    dp = [[0 for col in range(len2)] for row in range(len1)]  # len1 * len2
    weight = [[0 for col in range(len2)] for row in range(len1)]  # len1 * len2
    for i in range(len1):
        for j in range(len2):
            if p1[i].name == p2[j].name:
                weight[i][j] = weight[i][j] + p1[i].freq + p2[j].freq
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if i == 0 or j == 0:
                    dp[i][j] = 0
                    weight[i][j] = 0
                else:
                    if dp[i - 1][j] > dp[i][j - 1]:
                        dp[i][j] = dp[i - 1][j]
                        weight[i][j] = weight[i - 1][j]
                    else:
                        dp[i][j] = dp[i][j - 1]
                        weight[i][j] = max(weight[i - 1][j], weight[i][j - 1])
            if dp[i][j] > max_len:
                max_len = dp[i][j]
    i = len1 - 1
    j = len2 - 1
    res = []
    res1 = []
    has = [0 for i in range(len1)]
    has1 = [0 for j in range(len2)]
    sub1 = []
    sub2 = []
    while True:
        if p1[i].name == p2[j].name:
            res.insert(0, p1[i])
            res1.insert(0, p2[j])
            has[i] = 1
            has1[j] = 1
            if i == 0 or j == 0:
                break
            i = i - 1
            j = j - 1
        else:
            if i == 0 or j == 0:
                break
            if dp[i - 1][j] > dp[i][j - 1]:
                i = i - 1
            elif dp[i - 1][j] < dp[i][j - 1]:
                j = j - 1
            elif weight[i - 1][j] > weight[i][j - 1]:
                i = i - 1
            else:
                j = j - 1
    for i in range(len1):
        if has[i] == 0:
            sub1.append(p1[i])
    for j in range(len2):
        if has1[j] == 0:
            sub2.append(p2[j])
    return max_len, res, res1, sub1, sub2
    # res with pos1, res1 with pos2


class Event:
    def __init__(self, name='', freq=0, pos=-1):
        self.name = name  # name like 'appInit'
        self.freq = freq  # number of sequence mapped
        self.pos = pos    # position in pattern

    def __str__(self):
        return "{}, {}, {}".format(self.name, self.freq, self.pos)

    def __lt__(self, other):
        return self.freq < other.freq


class Pattern:
    def __init__(self, events=[], seqs=[], insert=[]):
        self.events = events        # list of Events
        self.seqs = seqs            # list of mapped sequence
        self.insert = insert        # list of insertions, every position is a list
        self.edit = -1              # the number of edits, need to be calculated by self.edits()
        self.hash_events = None     # list of Events in number
        self.wm = None              # hash

    def __str__(self):              # pattern print
        ans = 'events:\n'
        for event in self.events:
            ans = ans + event.__str__() + '\n'
        ans = ans + 'seqs:\n'
        ans = ans + self.seqs.__str__() + '\n'
        ans = ans + 'insert:\n'
        for item in self.insert:
            ans = ans + '['
            for e in item:
                ans = ans +  '[' + e.__str__() + '],'
            ans = ans + ']\n'
        return ans

    def __len__(self):
        return len(self.events)

    def __lt__(self, other):
        return len(self.seqs) < len(other.seqs)

    def edits(self):  # calculate the edits number from sequences mapped to events, update self.edit
        res = 0
        for s in self.seqs:
            temp = edits(sequences[s], self.events)
            res = res + temp
        self.edit = res
        return res

    def edits_new(self, events):  # calculate the number of edits from sequences to this events
        res = 0
        for s in self.seqs:
            temp = edits(sequences[s], events)
            res = res + temp
        return res

    def insert_action(self, name, pos):  # insert event name on pos
        length = len(self.insert[pos])
        for i in range(length):
            if self.insert[pos][i].name == name:
                self.insert[pos][i].freq = self.insert[pos][i].freq + 1
                return
        e = Event(name=name, freq=1, pos=pos)
        self.insert[pos].append(e)
        return

    def cal_insert(self):  # calculate insert from sequences to events
        for s in self.seqs:
            edit_insert(sequences[s], self)

    def insert_reorder(self):  # insert reorder by frequency
        for ins_list in self.insert:
            list.sort(ins_list, reverse=True)

    def cal_hash_events(self):  # calculate hash_events and wm
        self.hash_events = []
        for e in self.events:
            self.hash_events.append(config.event_dict[e.name])
        self.hash_events = self.hash_events + [0 for temp in range(206-len(self.hash_events))]
        wm = wmg.minhash(self.hash_events)
        self.wm = wm


def construct(strings, id=0):  # get pattern from sequence id
    res = Pattern()
    i = 0
    events = []
    for item in strings:
        event = Event(name=item, freq=1, pos=i)
        i = i + 1
        events.append(event)
    res.events = events
    res.seqs = [id]
    res.insert = [[] for i in range(len(events) + 1)]
    return res


def construct_from(events, seqs):  # get pattern from events and seqs
    res = Pattern()
    res.events = deepcopy(events)
    res.seqs = deepcopy(seqs)
    res.insert = [[] for temp in range(len(events) + 1)]
    res.cal_insert()
    return res


def find_pos(e, events):  # find insert pos of e in events
    pos = e.pos
    i = 0
    for temp in events:
        if temp.pos == -1:
            i = i + 1
        elif temp.pos < pos:
            i = i + 1
        else:
            return i
    return i


def union(m1, m2, p1, p2):  # union to get pattern
    events = []
    i = 0
    for item in m1:
        temp = Event(name=item.name, pos=i)
        i = i + 1
        events.append(temp)
    list_seq = p1.seqs + p2.seqs
    list.sort(list_seq)
    res = construct_from(events, list_seq)
    return res


def merge(p1, p2):  # merge Pattern1 and Pattern2
    [length, m1, m2, ec1, ec2] = LCS(p1.events, p2.events)
    if length <= 1:
        if len(p1.events) == 1 and len(p2.events) == 1 and length == 1:
            pass
        else:
            return -1, None
    e1 = deepcopy(ec1)
    e2 = deepcopy(ec2)
    list.sort(e1, reverse=True)
    list.sort(e2, reverse=True)
    delta_const = len(p1) + len(p2) + alpha * (p1.edits() + p2.edits()) + lambda_
    # print(len(p1), len(p2), p1.edit, p2.edit, delta_const)
    # delta need - length and - newEdit
    edit1 = p1.edits_new(m1)
    edit2 = p2.edits_new(m2)
    delta = delta_const - length - alpha * (edit1 + edit2)
    # print(length, edit1, edit2, delta)
    temp_p1 = deepcopy(m1)
    temp_p2 = deepcopy(m2)
    while True:
        temp = None
        if len(e1) == 0 and len(e2) == 0:
            break
        if (len(e1) != 0 and len(e2) != 0 and e1[0] > e2[0]) or (len(e1) != 0 and len(e2) == 0):
            temp = e1[0]
            e1.pop(0)
            pos = find_pos(temp, temp_p1)
            temp_p1.insert(pos, temp)
            temp1 = deepcopy(temp)
            temp1.pos = -1
            temp_p2.insert(pos, temp1)
        else:
            temp = e2[0]
            e2.pop(0)
            pos = find_pos(temp, temp_p2)
            temp_p2.insert(pos, temp)
            temp1 = deepcopy(temp)
            temp1.pos = -1
            temp_p1.insert(pos, temp1)
        edit1 = p1.edits_new(temp_p1)
        edit2 = p2.edits_new(temp_p2)
        temp_delta = delta_const - len(temp_p1) - alpha * (edit1 + edit2)
        # print(len(temp_p1), edit1, edit2, temp_delta)
        if temp_delta < 0 or temp_delta < delta:
            break
        else:
            delta = temp_delta
            m1 = deepcopy(temp_p1)
            m2 = deepcopy(temp_p2)
    res = union(m1, m2, p1, p2)
    return delta, res


def cal_minhash(p1, p2): # calculate hash between p1 and p2
    if p1.hash_events is None:
        p1.cal_hash_events()
    if p2.hash_events is None:
        p2.cal_hash_events()
    return p1.wm.jaccard(p2.wm)


# begin process
print(len(sequences))
print(max_len)
Q = []
C = []
for i in range(len(sequences)):
#for i in range(rrange):
    temp = construct(sequences[i], id=i)
    C.append(temp)
s = time.time()
for i in range(len(C)):
    if i % 10 == 0:
        print("begin ", i)
    j = i + 1
    while j < len(C):
        ###
        # if cal_minhash(C[i], C[j]) < th:
        #     j = j + 1
        #     continue
        ###
        [delta, temp_pattern] = merge(C[i], C[j])
        if delta > 0:
            heapq.heappush(Q, (-delta, temp_pattern, i, j))
        j = j + 1
print("begin");
while len(Q) > 0:
    [delta, pattern, i, j] = Q.pop(0)
    C[i] = None
    C[j] = None
    Q_new = [item for item in Q if item[2] != i and item[2] != j and item[3] != i and item[3] != j]
    Q = Q_new
    for x in range(len(C)):
        # if C[x] is not None and cal_minhash(C[x], pattern) >= th:
        if C[x] is not None:
            delta, new_pattern = merge(C[x], pattern)
            if delta > 0:
                heapq.heappush(Q, (-delta, new_pattern, len(C), x))
        th = th - decrease_step
    C.append(pattern)
# test
res = [item for item in C if item is not None]
end = time.time()
# print("--------------------")
# for item in res:
#     print(item)
#     print("--------------------")
print(len(res))
print(end - s)

data = []
x = 0
for item in res:
    pattern = {'id': x, 'events': [], 'seqs': deepcopy(item.seqs), 'insert': []}
    events = item.events
    insert = item.insert
    for e in events:
        ee = {'name': e.name, 'freq': e.freq}
        pattern['events'].append(ee)
    for i in insert:
        ii = {'size': 0, 'data': []}
        for e in i:
            ee = {'name': e.name, 'freq': e.freq}
            ii['data'].append(ee)
            ii['size'] = ii['size'] + 1
        pattern['insert'].append(ii)
    data.append(pattern)
    x = x + 1
jsondata = json.dumps(data)
f = open('pattern_data6.json', 'w')
f.write(jsondata)
f.close()


sequences = []
last_id = -1
temp_sequence = None
max_len = 0
for i in result:
    if int(i[0]) > int(last_id):  # new sequence begin
        if temp_sequence is not None and len(temp_sequence['events']) > max_len:
            max_len = len(temp_sequence['events'])
        last_id = int(i[0])
        if temp_sequence is not None:
            sequences.append(temp_sequence)  # add last sequence
        temp_sequence = {'id': int(i[0]), 'events': [], 'belong': -1}
    elif int(i[0]) < int(last_id):
        temp = sequences[int(i[0])]
        if len(temp['events']) == 0 or temp['events'][len(temp['events']) - 1]['name'] != i[1]:
            newEvent = {'name': i[1], 'pos': -1}
            sequences[int(i[0])]['events'].append(newEvent)
    if len(temp_sequence['events']) == 0 or temp_sequence['events'][len(temp_sequence['events']) - 1]['name'] != i[1]:
        newEvent = {'name': i[1], 'pos': -1}
        temp_sequence['events'].append(newEvent)
if len(temp_sequence['events']) > max_len:
    max_len = len(temp_sequence['events'])
sequences.append(temp_sequence)


def edit_insert1(sequence, pattern):  # update newEvent = {'pos': -1}
    events = pattern.events
    s = sequence['events']
    len1 = len(s)
    len2 = len(events)
    max_len = 0
    dp = [[0 for col in range(len2)] for row in range(len1)]
    for i in range(len1):
        for j in range(len2):
            if s[i]['name'] == events[j].name:
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                if i == 0 or j == 0:
                    dp[i][j] = 0
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            if dp[i][j] > max_len:
                max_len = dp[i][j]
    edits = len1 + len2 - 2 * max_len
    i = len1 - 1
    j = len2 - 1
    while True:
        if s[i]['name'] == events[j].name:
            # pattern.events[j].freq = pattern.events[j].freq + 1
            s[i]['pos'] = j
            if i == 0 or j == 0:
                break
            i = i - 1
            j = j - 1
        else:
            if i == 0 or j == 0:
                break
            if dp[i - 1][j] > dp[i][j - 1]:
                # s[i] is need to be inserted at events pos j + 1
                # pattern.insert_action(s[i], j + 1)
                i = i - 1
            else:
                j = j - 1
    if i > 0:
        while i >= 0:
            # pattern.insert_action(s[i], 0)
            i = i - 1

x = 0
for p in res:
    for id in p.seqs:
        sequences[id]['belong'] = x
        edit_insert1(sequences[id], p)
    x = x + 1
jsondata = json.dumps(sequences)
f = open('sequence_data6.json', 'w')
f.write(jsondata)
f.close()
