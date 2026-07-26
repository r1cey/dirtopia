import CtxM	from "../ContextMenu.js"



export default class CtxMInv	extends CtxM
{
	static optcfgs	=
	[
		CtxM.newoptcfg(

			"move"
			,
			function()
			{
				return ! this.ui().itmoving
			},
			function( cl )
			{
				const div	=this.tgt

				div.setmoving()

				// const gobj	=div.getgo()

				cl.ui.runitemmoving( div )

				// document.

				// debugger
			}
		),
		CtxM.newoptcfg(

			"move here"
			,
			function()
			{
				const divmov	=this.ui().itmoving

				if( ! divmov )	return false

				const div	=this.tgt

				const gomov	=divmov.getgo()

				const gobj	=div.getgo()

				if( gobj === gomov )	return false

				return gobj.canadditem( gomov ,1 ,div.gnav() )
			},
			function( cl )
			{
				console.log( "ueee" )
			}
		)
	]


	constructor( tgt ,pos )
	{
		super( tgt ,pos )

		this.setopts()
	}
}