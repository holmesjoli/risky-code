import pandas as pd
import os
import json

# pth = "../data/"

"""
Write out JSON file
param df dataframe
param pth string 
param fl_name string
"""
def write_json(df, pth, fl_name):

    assert(pth is not None)
    with open(os.path.join(pth, fl_name + ".json"), 'w') as f:
        json.dump(df, f)

def json_data(data):
    data = data[data.race.isin(["African-American", "Caucasian"])]
    data = data[["id", "v_decile_score", "two_year_recid", "race"]]

    array = []

    for id in data.id.unique():

        row = {"id": int(id),
               "recidivate": int(data[data.id == id].two_year_recid.iloc[0]),
               "riskScore": int(data[data.id == id].v_decile_score.iloc[0]),
               "race": data[data.id == id].race.iloc[0]
                }
    
        array.append(row)

    return array

def main():

    pth = os.path.join("..", "..", "data")
    data = pd.read_csv(os.path.join(pth, "raw", "compas-scores-two-years.csv"))
    dataProcessed = json_data(data)

    write_json(dataProcessed, os.path.join(pth, "processed"), "compas")

if __name__ == '__main__':
    main()