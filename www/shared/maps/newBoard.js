// import Loc from '../Loc.js'


/** This is the basis of full maps.
 * Full maps have both binary data and object data.
 * Here it's just an array of cells so can't deal with Locations. */

/** 
 * @arg {(id,bmapa,structadd)=>Bin}	newBin */

export default( newBin )=>class Board	extends BoardBase
{	
	static newBin	=newBin
}



class BoardBase
{
	bin

	/** Cell objects. In Board they're just sorted in order.
	 * For inner values, look into Obj.js */
	obj	=[]


	///////////////////////////////////////////////////////////////////////////



	setloc( loc )
	{
		this.bin.setloc( loc )
	}


	getloc()
	{
		return this.bin.getloc()
	}

	
	///////////////////////////////////////////////////////////////////////////
}