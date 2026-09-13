import newContainer from "../../www/shared/items/newContainer.js"

import{ IdPool }	from "../../www/shared/utils.js"

import{ savejson ,readjson}	from "../fs.js"



export default class Cnt	extends newContainer()
{
	openedby	=new Set()

	static idpool	=new IdPool()


	/** Hope constructor is not needed in any base classes.
	 * Is a quick way to make usable containers. */

	constructor( isuniq )
	{
		super()

		this.openedby.toJSON	=()=>undefined

		if( isuniq )	this.setuniq()
	}
	
	
	delitem( item ,len ,nav ,ismov )
	{
		if( super.delitem( item ,len ,nav ,ismov ) )	this.deluniq()
	}

	setuniq()	{ this.id	=Cnt.idpool.new() ;return this }

	static
	{
		this.prototype.su	=this.prototype.setuniq
	}

	deluniq()	{ Cnt.idpool.del( this.id )}



	static async save( dir)
	{
		return savejson(`${dir}idpool.json` ,Cnt.idpool)
	}


	static async load( dir)
	{
		const inipool	=await readjson(`${dir}idpool.json`)

		if( inipool)	this.idpool.set( inipool)
	}
}
