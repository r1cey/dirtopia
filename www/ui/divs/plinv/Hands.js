import DivGo	from "../../DivGameObj.js"

// import GridC from "./Cell.js"


export default class Hands extends DivGo
{
	item


    constructor( hands ,dad )
	{
		super( hands ,dad ,dad.el.querySelector("hands") )	

		if( hands.item )	this.additem( hands.item )
	}


	additem( item )
	{
		const div	=this

		const divit	=new DivGo( item ,div ,item.gkey() )

		div.item	=divit

		div.el.appendChild( divit.el )
	}


	delitem( item )
	{
		if( item === this.gobj.item )
		{
			this.el.removeChild( this.item.el )

			this.item	=null
		}
		else	console.error( "Hands.delitem: item not in hands" ,item )
	}
}