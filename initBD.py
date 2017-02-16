import sqlite3 as lite
import sys

if __name__=="__main__":
	con = None

	try:
	    con = lite.connect('test.db')
	    cur = con.cursor()    
	    cur.execute('SELECT SQLITE_VERSION()')
	    cur.execute("CREATE TABLE Box(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, car TEXT, drives INT,travels INT,travelCost INT)")
                 
	    
	except lite.Error, e:
	    
	    print "Error %s:" % e.args[0]
	    sys.exit(1)
	    
	finally:
	    
	    if con:
	        con.close()