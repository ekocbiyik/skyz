import sqlite3

con = sqlite3.connect("db.sqlite3")
path = '/home/cagri/Workspace/skyz/datas/'
files = ['ekonomi.txt', 'politika.txt', 'sanat.txt', 'spor.txt', 'teknoloji.txt']
cur = con.cursor()
for file in files:
    f = open(path+file)
    for sql in f:
        cur.executescript(sql)
con.close()
