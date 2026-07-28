import CtxM	from "../ContextMenu.js"


const newcfg	=CtxM.newoptcfg

export default class CtxMInv	extends CtxM
{
	static optcfgs	=
	[
		newcfg(

			"move"
			,
			function()
			{
				return ! this.ui().itmoving
			},
			function( cl )
			{
				const div	=this.tgt

				// div.setmoving()

				cl.ui.runitemmoving( div )
			}
		),
		newcfg(

			"move here"
			,
			function()
			{
				const divmov	=this.ui().itmoving

				if( ! divmov )	return false

				const div	=this.tgt

				const gomov	=divmov.getgo()

				const gobj	=div.getgo()

				return gobj.canadditem( gomov ,1 ,div.gnav() )
			},
			function( cl )
			{
				const divmov	=cl.ui.itmoving

				const from	=divmov.gnav()

				const gomov	=from.pop()

				cl.srv.send( "movitem" ,from ,gomov ,0 ,this.tgt.gnav() )
			}
		),
		newcfg(

			"cancel move"
			,
			function()
			{
				const ui	=this.ui()

				return ui.itmoving
			},
			function( cl )
			{
				cl.ui.stopitemmoving()
			}
		)
	]


	constructor( tgt ,pos )
	{
		super( tgt ,pos )

		this.setopts()
	}
}