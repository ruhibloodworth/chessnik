import argparse
import csv
import random
import sys

parser = argparse.ArgumentParser()
parser.add_argument("filename", help="input puzzles filename")
parser.add_argument("-o", "--output", help="output filename")
args = parser.parse_args()

buckets = {}

with open(args.filename) as csvfile:
    puzzlereader = csv.reader(csvfile)
    puzzlereader.__next__()
    for row in puzzlereader:
        rating = int(row[3])
        key = rating//100*100
        bucket = buckets.get(key)
        if bucket is None:
            bucket = []
            buckets[key] = bucket
        bucket.append(row)

with open(args.output, "w") if args.output else sys.stdout as csvfile:
    puzzlewriter = csv.writer(csvfile)
    for key in sorted(buckets.keys()):
        bucket = buckets[key]
        if len(bucket) < 100:
            sample = bucket
        else:
            sample = random.sample(bucket, 100)
        puzzlewriter.writerows(sample)
