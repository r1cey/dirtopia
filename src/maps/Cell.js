import newLive from "../../www/shared/newLiveObj.js"


export default newLive( class Cell
{
	gitem()	{return this.dad.obj.g(this._this)?.item }


	additem( item )
	{
		var{ dad :map ,_this :loc }	=this

		var curitem	=this.gitem()

		if( curitem )
		{
			var vacloc	=map.findempty( loc , 1 )

			if( vacloc )
			{
				map.game().syncmovitem( this ,curitem, curitem.len ,
					
					new this.constructor( vacloc ,map.maps )
				)
			}
			else	return
		}
		map.srv().send_mapadditem( map ,loc ,item )

		map.obj.s(loc).item	=item

		return this
	}


	/**@todo error handling */

	path2live( nav )
	{
		var{ dad :map ,_this :loc }	=this

		var	item	=map.obj.g(loc)?.item
		
		if( ! item || item.gkey() !== nav[0][nav[1]] )	return

		++ nav[1]
		
		return item.newlive( this )
	}


	canchildadditem( child ,item ,len )
	{
		var{ dad :map ,_this :loc }	=this

		if( child._this.constructor.isstcnt )
		{
			var vacloc	=map.findempty( loc , 1 )
			
			return vacloc ? len : 0
		}
		return len
	}
})