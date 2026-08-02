export default class Actions
{
	static acts	=
	{
		itemmov	:
		[
			function( game ,pl ,itnav ,tonav )
			{
				if( ! pl.canreach( itnav.gloc() ) ||
				.
					! pl.canreach( tonav.gloc() ))	return 0

				return tonav.canmovitem( itnav.last() )
			},
			function( game ,pl ,len ,itnav ,tonav )
			{
				
			}
		]
	}
}