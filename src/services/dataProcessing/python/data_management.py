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
                 "group": "Example",
                 "name": df[df.example_id == j].example.iloc[0],
                 "citation": df[df.example_id == j].citation.iloc[0]}

            examples.append(r)

        row = {"area_id": int(i),
               "group": "Policy area",
               "name": df[df.area_id == i].area.iloc[0],
               "children": examples}

        areas.append(row)

    return {"area_id": int(0),
            "group": "Root",
            "name": "Algorithmically Informed Decision-Making", 
            "children": areas}


def laundry_data(df):

    array = []

    for i in range(0, df.shape[0] - 1):

        # import pdb; pdb.set_trace()

        row = {
            "id": int(i),
            "cleanType": df.iloc[i].clean_type,
            "delicate": bool(df.iloc[i].delicate),
            "clothes": bool(df.iloc[i].clothes),
            "hotWaterLoad": bool(df.iloc[i].how_water_load),
            "print": bool(df.iloc[i].prints),
            "pastel": bool(df.iloc[i].pastel),
            "white": bool(df.iloc[i].white),
            "color": df.iloc[i].color,
            "itemType": df.iloc[i].item_type
        }
        array.append(row)

    return array
