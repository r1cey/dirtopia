// import SG from './ServGet.js'


export default( Base )=>class SS extends Base
{
	constructor(...args)	{ super(...args) }


///////////////////////////////////////////////////////////////////////////////



	em_newplayer( o )
	{
		return[[ o ]]
	}


	///////////////////////////////////////////////////////////////////////////////



	em_mov( dest )
	{
		return[ dest ]
	}



	em_wrtc( o )
	{
		return[[ o ]]
	}




	em_climb( dir, loc )
	{
		return[[ dir, loc ]]
	}



	em_movitem( from ,len ,to )
	{
		const item	=from.last()

		const msg	=
		[
			from
			,
			len
			/*item.iscnt	? item.id :

				item.isstck	? ( len>0 ? len : item.len ) :
			
					console.error( "em_movitem" ,from ,to )*/
			,
			to
		]
		if( ! msg[1] )	return []

		return [msg/*, ( key ,val )=>
			{
				switch( key )
				{
					case "from" :

					case "to" :

						const len	=val.length

						for(var i =0;i<len;i++)
						{
							val[i]	=val[i].tonavmsg()
						}
				}
				return val
			}*/]
	}



	em_actonobj( path, act, params )
	{
		return[[ path, act, params ]]
	}
}


///////////////////////////////////////////////////////////////////////////////


/*
for(var funn in out)
{
	out["send_"+funn]	=out[funn]

	out["s_"+funn]	=out[funn]

	delete out[funn]
}*/