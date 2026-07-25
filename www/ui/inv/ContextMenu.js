import CtxM	from "../ContextMenu.js"



class CtxMInv	extends CtxM
{
	static optcfgs	=
	[
		CtxM.newoptcfg(

			"move"
			,
			function()
			{
				return true
			},
			function( cl )
			{
				
			}
		)
	]
}