import Loc from '../../www/shared/Loc.js'

// import Stack from '../../www/shared/items/Stackable.js'




// export default( Base =Object )=>class ClS extends Base

export default {
	
///////////////////////////////////////////////////////////////////////////////



	setclpl()
	{
		return this.pl
	}


,
	setmap()
	{
		const{ pl }	=this

		const maps	=this.game.maps

		var slicedgr	=maps.gr.slice( pl.loc, pl.vision )

		this.sendbin( slicedgr.bin.getbuf())

		var slicedtr	=maps.tr.slice( pl.loc, pl.vision )

		this.sendbin( slicedtr.bin.getbuf())

		return{
			
			val :
			[
				{ gr :slicedgr.obj.o, tr :slicedtr.obj.o }
				,
				pl.loc
				,
				pl.vision
			],
			replcr	:
				( key, val )=> key==="pl"&&pl.name===val.name ? val.name : val
		}
	}


	//////////////////////////////////////////////////////////////////////////////

,
	/** This client's player had moved. */

	mov( dest )
	{
		return dest
	}

,
	movrej( curloc )
	{
		return curloc
	}

,
	/** Assumes player has already climbed */

	clplclimb( dir )
	{
		this.sendjson({ clplclimb: { dir, newloc: this.pl.loc }})
	}


	///////////////////////////////////////////////////////////////////////////////

,
	/** @arg {string} act 
	 * @arg {array} vals */

	mapset_([ map, eff, loc, vals ])
	{
		return [
		
			map.bin.constructor.id
			,
			loc
			,
			eff
			,
			vals
		]
	}


,
	mapobjset([ map, loc, key ])
	{
		this.sendjson({mapobjset:
			[
				loc , key , map.obj.g(loc)[key]
			]
		})
	}


	///////////////////////////////////////////////////////////////////////////


,
	itemmov( msg )
	{
		msg.mover	=msg.mover.name

		if( msg.newcnt )	msg.newcnt	=msg.newcnt.id

		if( msg.slotnewcnts )
		{
			const ncnts	=msg.slotnewcnts

			const len	=ncnts.length

			for(var i =0 ;i<len;++i)
			{
				ncnts[i]	=ncnts[i].id
			}
		}
		return msg
	}


	///////////////////////////////////////////////////////////////////////////
,
	/** New player born. */

	newpl( pl2 )
	{
		return [[ pl2 ]]
	}

,
	/** Different player connected */

	plconn([ pl2, connstat ])
	{
		return [[ pl2.name ,connstat ]]
	}



	/*Send.prototype. createpl	=function( name )
	{
		this.json({ createpl: name })
	}

	Send.prototype. units	=function( clid, pln )
	{
		var pls	=this.s.g.pls

		var pl	=pls[pln]

		var o	=
		{
			pls	:[]
		}
		
		this.s.g.forseenpls( pln, ( pl2n )=>
		{
			o.pls.push( pls[pl2n].newmsgvis( pl2n ) )
		})
		
		this.json( clid, {units: o})
	}

	Send.prototype. water	=function()
	{
		this.send_json({ water: this.pl.water })
	}*/


,
	/** Player object should have old location still. */

	plmov([ clid, pl2n, newloc, seen, pl2 ])
	{
		var pl	=this.cl.pl

		var o	={ loc: newloc.newarr() }

		seen ?
			o.name	=pl2n	:
			o.pl	=pl2.newmsgvis(pl2n)

		this.sendjson(clid, { plmov: o })
	}


,
	actonobj([ loc, key, act, params ])
	{
		this.sendjson({actonobj:{ loc, key, act, params }})
	}


	///////////////////////////////////////////////////////////////////////////////


,
	shiftmap( dir )
	{
		const{ pl }	=this

		const{ loc }	=pl

		const r	=pl.vision

		const msgo	={ gr	:0 , tr	:0 }

		const msgbs	=this.ggame().maps.gshiftboards( loc, r, dir )

		for(var n in msgbs )
		{
			this.sendbin( msgbs[n].bin.getbuf() )

			msgo[n]	=msgbs[n].obj
		}
		return[ msgo, loc, r, dir ]
	}


,
	wrtc( o )
	{
		return o
	}

	,
	error([ actid =0 ,str ])
	{
		return[ actid ,str ]
	}
}


///////////////////////////////////////////////////////////////////////////////



/*
for(var funn in ClS.prototype)
{
	ClS.prototype["send_"+funn]	=ClS.prototype[funn]

	ClS.prototype["s_"+funn]	=ClS.prototype[funn]

	delete ClS.prototype[funn]
}*/