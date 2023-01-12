"""
"""
def policy_data(df):

    areas = []

    for i in df.area_id.unique():

        area = df[df.area_id == i]

        examples = []

        for j in area.example_id.unique():

            r = {"example_id": int(j),
                 "area_id": int(df[df.example_id == j].area_id.iloc[0]),
                 "group": "example",
                 "name": df[df.example_id == j].example.iloc[0],
                 "citation": df[df.example_id == j].citation.iloc[0]}

            examples.append(r)

        row = {"area_id": int(i),
               "group": "area",
               "name": df[df.area_id == i].area.iloc[0],
               "children": examples}

        areas.append(row)

    return {"area_id": int(0),
            "group": "root",
            "name": "Algorithmically Informed Decision-Making", 
            "children": areas}
