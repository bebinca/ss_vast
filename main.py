import csv
from copy import deepcopy

alpha = 1
lambda_ = 1
result = None
with open('Events08Only.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    result = list(reader)
del (result[0])
# read all sequences
sequences = []
last_id = -1
temp_sequence = None
for i in result:
    if int(i[0]) != int(last_id):  # new sequence begin
        last_id = int(i[0])
        if temp_sequence is not None:
            sequences.append(temp_sequence)  # add last sequence
        temp_sequence = []
    temp_sequence.append(i[1])
sequences.append(temp_sequence)
# for row in sequences:
#     print(row)


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


# event has name, freq, pos1, pos2
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
    # res with pos1, res1 with pos2,


# event has name, freq, pos1, pos2
def _CS_(p1, p2):  # longest common substring, used in merge
    len1 = len(p1)
    len2 = len(p2)
    max_len = 0
    dp = [[0 for col in range(len2)] for row in range(len1)]  # len1 * len2
    for i in range(len1):
        for j in range(len2):
            if p1[i] == p2[j]:
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
    i = len1 - 1
    j = len2 - 1
    res = []
    while True:
        if p1[i] == p2[j]:
            res.insert(0, p1[i])
            if i == 0 or j == 0:
                break
            i = i - 1
            j = j - 1
        else:
            if i == 0 or j == 0:
                break
            if dp[i - 1][j] > dp[i][j - 1]:
                i = i - 1
            else:
                j = j - 1
    return max_len, res


class Event:
    def __init__(self, name='', freq=0, pos=-1):
        self.name = name
        self.freq = freq
        self.pos = pos

    def __str__(self):
        return "{}, {}, {}".format(self.name, self.freq, self.pos)

    def __lt__(self, other):
        return self.freq < other.freq


class MergingEvent:
    def __init__(self, event1, event2):
        self.name = event1.name
        self.freq = event1.freq + event2.freq
        self.pos1 = event1.pos
        self.pos2 = event2.pos

    def __str__(self):
        return "{}, {}, {}, {}".format(self.name, self.freq, self.pos1, self.pos2)

    def __lt__(self, other):
        return self.freq < other.freq


class Pattern:
    def __init__(self, events=[], seqs=[], insert=[]):
        self.events = events
        self.seqs = seqs
        self.insert = insert
        self.edit = -1

    def __str__(self):
        ans = ''
        for event in self.events:
            ans = ans + event.__str__() + '\n'
        ans = ans + self.seqs.__str__() + '\n'
        ans = ans + self.insert.__str__() + '\n'
        return ans

    def __len__(self):
        return len(self.events)

    def edits(self):
        res = 0
        for s in self.seqs:
            temp = edits(sequences[s], self.events)
            res = res + temp
        self.edit = res
        return res

    def edits_new(self, events):
        res = 0
        for s in self.seqs:
            temp = edits(sequences[s], events)
            res = res + temp
        return res


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


def merge(p1, p2):  # merge Pattern1 and Pattern2
    [length, m1, m2, ec1, ec2] = LCS(p1.events, p2.events)
    e1 = deepcopy(ec1)
    e2 = deepcopy(ec2)
    list.sort(e1, reverse=True)
    list.sort(e2, reverse=True)
    delta_const = len(p1) + len(p2) + alpha * (p1.edits() + p2.edits()) + lambda_
    print(len(p1), len(p2), p1.edit, p2.edit, delta_const)
    # delta need - length and - newEdit
    edit1 = p1.edits_new(m1)
    edit2 = p2.edits_new(m2)
    delta = delta_const - length - alpha * (edit1 + edit2)
    print(length, edit1, edit2, delta)


pattern1 = construct(sequences[1], id=1)
pattern2 = construct(sequences[2], id=2)
print(merge(pattern1, pattern2))
# [x, y, z, zz, zzz] = LCS(pattern1.events, pattern2.events)
# # print(x, y, z)
# zzz = [[] for i in range(2)]
# print(zzz)
