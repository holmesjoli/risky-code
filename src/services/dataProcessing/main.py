import pandas as pd
import os
import json

from python.helper import json_data, write_json
from python.data_management import policy_data, laundry_data

# pth = "../data/"

def main():

    pth = os.path.join("..", "..", "data")
    data = pd.read_csv(os.path.join(pth, "raw", "compas-scores-two-years.csv"))
    dataProcessed = json_data(data)
    write_json(dataProcessed, os.path.join(pth, "processed"), "compas")

    policyNested = policy_data(pd.read_csv(os.path.join(pth, "raw", "policy_examples.csv")))
    write_json(policyNested, os.path.join(pth, "processed"), "policy")

    laundryNested = laundry_data(pd.read_csv(os.path.join(pth, "raw", "laundry_data.csv")))
    write_json(laundryNested, os.path.join(pth, "processed"), "laundry")

if __name__ == '__main__':
    main()