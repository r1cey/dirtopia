import CtxM	from "../ContextMenu.js"


const newcfg	=CtxM.newoptcfg

export default class CtxMInv	extends CtxM
{
	static optcfgs	=
	[
		newcfg(
			"take"
			,
			function(){return	! this.ui().cl.pl.hands.item }
			,
			function()
			{
				const from	=this.tgt.gnav()

				const to	=this.gclpl().handsnav

				this.ui().cl.srv.send( "movitem" ,from ,0 ,to )
			}
		)
		/*newcfg(

			"move"
			,
			function()
			{
				return ! this.ui().itmoving
			},
			function()
			{
				const div	=this.tgt

				// div.setmoving()

				this.html().ui.runitemmoving( div )
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
			function()
			{
				const divmov	=this.ui().itmoving

				const from	=divmov.gnav()

				const gomov	=from.pop()

				this.html().ui.cl.srv.send( "movitem" ,from ,gomov ,0 ,this.tgt.gnav() )
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
			function()
			{
				this.ui().stopitemmoving()
			}
		)*/
	]


	constructor( tgt ,pos )
	{
		super( tgt ,pos )

		this.setopts()
	}



	setopts()
	{
		super.setopts()


	}
}