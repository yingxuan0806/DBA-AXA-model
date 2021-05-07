import pandas as pd

df_string = pd.read_csv("Valuation_data.csv")
df_string.head()

df_string_lst = df_string.to_string(header=False, index=False, index_names=False).split('\n')


def notEmpty(s):
    return s != "" and s != "NaN"


res = []
for row in df_string_lst:
    arr = row.replace(",", " ").split(" ")
    reverse = list(filter(notEmpty, arr))[::-1]

    row = " ".join(reverse)
    row = row.replace(" & ", "&").replace(" AND ", "&")
    arr = row.split(" ")

    texts = ",".join(arr[6:])
    processed = reverse[:6] + [texts]
    res.append(processed[::-1])

df_completed = pd.DataFrame(res, columns = df_string.columns.values[:7])
df_completed.head()

df_completed.to_csv("to_amanda_3.csv", index = False)