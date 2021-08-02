import csv
from copy import deepcopy
import heapq
import config
from datasketch import WeightedMinHashGenerator
import time
import json
from functools import cmp_to_key
# constants

f = open("pattern_data6.json")
p = json.load(f)
p = sorted(p, key=cmp_to_key(lambda x, y: len(y['seqs']) - len(x['seqs'])))
jsondata = json.dumps(p)
f = open('pattern_data_sort6.json', 'w')
f.write(jsondata)
f.close()




# f = open("pattern_data5.json")
# t = json.load(f)
# length = len(t)
# sum = 0
# for i in range(length):
#     sum = sum + len(t[i]['seqs'])
# aver = sum / length
# print(length, sum, aver)
# sum = 0
# for i in range(length):
#     sum = sum + len(t[i]['events'])
# aver = sum / length
# print(length, sum, aver)




# read the file
# result = None
# with open('Events08Only.csv', 'r', encoding='utf-8') as f:
#     reader = csv.reader(f)
#     result = list(reader)
# del (result[0])
# # read all sequences
# sequences = []
# last_id = -1
# temp_sequence = None
# max_len = 0
# for i in result:
#     if int(i[0]) > int(last_id):  # new sequence begin
#         if temp_sequence is not None and len(temp_sequence['events']) > max_len:
#             max_len = len(temp_sequence['events'])
#         last_id = int(i[0])
#         if temp_sequence is not None:
#             sequences.append(temp_sequence)  # add last sequence
#         temp_sequence = {'id': int(i[0]), 'events': []}
#     elif int(i[0]) < int(last_id):
#         temp = sequences[int(i[0])]
#         if len(temp['events']) == 0 or temp['events'][len(temp['events']) - 1]['name'] != i[1]:
#             newEvent = {'name': i[1], 'time': i[2], 'attr': i[3]}
#             sequences[int(i[0])]['events'].append(newEvent)
#     if len(temp_sequence['events']) == 0 or temp_sequence['events'][len(temp_sequence['events']) - 1]['name'] != i[1]:
#         newEvent = {'name': i[1], 'time': i[2], 'attr': i[3]}
#         temp_sequence['events'].append(newEvent)
# if len(temp_sequence['events']) > max_len:
#     max_len = len(temp_sequence['events'])
# sequences.append(temp_sequence)
# jsondata = json.dumps(sequences)
# f = open('sequence_data.json', 'w')
# f.write(jsondata)
# f.close()

