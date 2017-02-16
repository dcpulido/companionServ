import sqlite3 as lite

#PHASE1 classes and sqlite CRUD FOR ALL!
#PHASE2 Logics
#PHASE3 FLASK



#	TODO
#	----NEW BOX 
#	----DELETE BOX
#	----UPDATE BOX
#	----READ BOX
#	----select Box
#	->class travel
#	new travel
#	read total travels
#	read travels of box
#	read travels of many boxes
#


#
# BOX
#
class Box:
	def __init__(self,name,car,drives,travels,travelCost):
		self.name=name
		self.car=car
		self.drives=drives
		self.travels=travels
		self.travelCost=travelCost
		self.id=-1
	def get_name(self):
		return self.name
	def get_car(self):
		return self.car
	def get_drives(self):
		return self.drives
	def get_travels(self):
		return self.travels
	def get_travelCost(self):
		return self.travelCost
	def get_totalCost(self):
		return self.travelCost*self.drives
	def get_saved(self):
		return self.travelCost*travels-get_totalCost()
	def get_json(self):
		return '{name:'+self.name+',car:'+self.car+',drives:'+str(self.drives)+',travels:'+str(self.travels)+',travelCost:'+str(self.travelCost)+'}'
	def set_id(self,id):
		self.id=id
	def new_travel(self,isDriver):
		if isDriver:self.drives=self.drives+1
		self.travels=self.travels+1
		self.update_db()
	def save_on_db(self):
		try:
			con = lite.connect('test.db')
			cur = con.cursor()  
			cur.execute("insert into Box ( Name, car, drives, travels, travelCost ) values ( ?, ?, ?, ?, ?)",(self.name,self.car,self.drives,self.travels,self.travelCost))
			con.commit()
		except lite.Error, e:
		    print "Error %s:" % e.args[0]
		    sys.exit(1)
		finally:
		    if con:
		        con.close()
	def delete_from_db(self):
		print self.id
		try:
			con = lite.connect('test.db')
			cur = con.cursor()  
			print self.id
			cur.execute("DELETE FROM Box WHERE Id = ?",(self.id,))
			con.commit()
		except lite.Error, e:
		    print "Error %s:" % e.args[0]
		    sys.exit(1)
		finally:
		    if con:
		        con.close()

	def update_db(self):
		print "update"
		try:
			con = lite.connect('test.db')
			cur = con.cursor()  
			print self.id
			cur.execute("UPDATE Box SET drives=? WHERE Id=?", (self.drives, self.id))
			cur.execute("UPDATE Box SET travels=? WHERE Id=?", (self.travels, self.id)) 
			con.commit()
		except lite.Error, e:
		    print "Error %s:" % e.args[0]
		    sys.exit(1)
		finally:
		    if con:
		        con.close()

#
# TRAVEL
#
class Travel:
	def __init__(self):
		pass

#
#		GLOBALS
#
#

def get_Tha_Boxes():
	bb=[]
	con = None
	try:
		con = lite.connect('test.db')
		cur = con.cursor()  
		cur.execute("SELECT * FROM Box")
		rows=cur.fetchall()
		for r in rows:
			b=Box(r[1],r[2],r[3],r[4],r[5])
			b.set_id(r[0])
	   		bb.append(b)        
	except lite.Error, e:    
	    print "Error %s:" % e.args[0]
	    sys.exit(1)   
	finally:
	    return bb
	    if con:
	        con.close()


#
#	MAIN (ONLY for DEBUGING now)
#
#
if __name__=="__main__":
	Boxes=[]
	thaBox=None
	David=Box("david","micra",3,10,14)
	Boxes=get_Tha_Boxes()

	fl=True

	while fl==True:
		if thaBox!=None:print "SELECT "+thaBox.get_json()
		print "1->Select Box"
		print "2->Delete selected Box"
		print "3->Refresh rtam"
		print "4->New Box"
		print "5->New travel"
		print "q->quit"
		op=raw_input('Enter op:')

		if op=='1': 
			i=0
			for b in Boxes:
				print str(i)+": "+b.get_name()
				i=i+1
			k=raw_input("box:")
			thaBox=Boxes[int(k)]
			
		if op=='2':
			print thaBox.get_name()
			if thaBox != None:
				thaBox.delete_from_db()
		if op=='3':
			Boxes=[]
			Boxes=get_Tha_Boxes()
		if op=='5':
			thaBox.new_travel(True)

		if op=='q':
			fl=False


	