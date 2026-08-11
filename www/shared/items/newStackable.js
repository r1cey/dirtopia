import Item	from "./Item.js"

// import newJable	from "../newJsonable.js"


export default( Base =Item )=>class St	extends Base
{
	/**@todo ultimately this should be accessed through method because
	 * containers class has it as a method */
	
	len	=1

	// acts	={}


	static apprps	=[ "len" ]


	constructor( len )
	{
		super()
		
		if( len > 1 )	this.len	=len
	}


	get isstck()	{return this }


	glen()	{return this.len }


	calcvol()	{return this.vol() * this.len }


	clone( len )
	{
		var newst	=new this.constructor().set(this)

		newst.len	=len

		// this.len	-=len

		return newst
	}


	/**@returns true if object remains empty */
	del( l )
	{
		this.len	-=l

		if( this.len < 0 )	this.len	=0

		return this.len
	}
	


	static New( key ,vol ,newcls )
	{
		return class extends this
		{
			static key	=key

			static vol
		}
	}

/*
	toJSON( key )
	{
		switch( key )
		{
			case Stack.key :

				return[ this.constructor.key, this ]
		}
		return this
	}



	static newRevObj( jrev )
	{
		return {

			key	:Stack.key
			,
			fromJSON	:( meta )=>	jrev.revivr( meta[0], meta[1] )
		}
	}*/
}