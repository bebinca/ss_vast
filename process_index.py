import csv
from copy import deepcopy
import heapq
import config
from datasketch import WeightedMinHashGenerator
import time
import json
# constants


# read the file
events = []
events_sequence = {}
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
    if events_sequence.get(i[1]) is None:
        events_sequence[i[1]] = []
        events.append(i[1])
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

print(events_sequence)
i = 0
for s in sequences:
    for e in s:
        length = len(events_sequence[e])
        if length == 0 or events_sequence[e][length-1] != i:
            events_sequence[e].append(i)
    i = i + 1
print(events_sequence)


def jaccard_sim(a, b):
    unions = len(set(a).union(set(b)))
    intersections = len(set(a).intersection(set(b)))
    return 1. * intersections / unions


length = len(events_sequence)
res = [[0 for i in range(length)] for i in range(length)]
print(events)
for i in range(length):
    for j in range(length):
        res[i][j] = jaccard_sim(events_sequence[events[i]], events_sequence[events[j]])

result = {}
for i in range(length):
    e = events[i]
    temp = {}
    for j in range(length):
        temp[events[j]] = res[i][j]
    result[events[i]] = temp

jsondata = json.dumps(result)
f = open('filter_data.json', 'w')
f.write(jsondata)
f.close()
print(length)




