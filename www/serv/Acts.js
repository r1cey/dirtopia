export default class Acts
{
	i	=0

	MAX	=65536

	map	=new Map()



	add( act )
	{
		const id	=this.i++

		if( this.i >= this.MAX )	this.i	=0

		this.map.set( id, act )

		return id
	}

	del( id )
	{
		this.map.delete( id )
	}
}