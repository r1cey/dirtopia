export default class Cell
{
	loc

	map


	
	constructor( loc ,map )
	{
		this.loc	=loc

		this.map	=map
	}



	static frommap( loc ,map )
	{
		return new this( loc ,map )
	}


	static frommaps( loc ,maps )
	{
		return this.frommap( loc ,maps.loc2map(loc) )
	}



	isclpl()
	{
		const{ loc ,map }	=this

		const cobj	=map.obj.g( loc )

		// const pl	=?.pl

		return cobj?.pl?.isclpl
	}
}