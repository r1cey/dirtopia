// import NS from '../../www/shared/NSpace.js'

import Loc from "../../www/shared/Loc.js"



export default( Base )=>class SrvSend	extends Base
{

///////////////////////////////////////////////////////////////////////////////


/** @arg {string} act 
 * @arg {array} vals */
/*
out. mapset_	=function( map, act, loc, vals )
{
	for(var n in this.cls.o )
	{
		var cl	=this.cls.o[n]

		if( cl.pl.sees( loc ))
		{
			cl.send("mapset_", map, act, loc, vals )
		}
	}
}



out. mapobjset	=function( map, loc, key )
{
	for(var n in this.cls.o )
	{
		var cl	=this.cls.o[n]

		if( cl.pl.sees( loc ))
		{
			cl.send_mapobjset( map, loc, key )
		}
	}
}*/


///////////////////////////////////////////////////////////////////////////////





/*
out. plmov	=function( pl, oldloc )
{
	var newloc	=pl.loc

	var delta	=new Loc().set(newloc).subv(oldloc)

	if( pl.cl && ! delta.h )	pl.cl.send("clplmov" ,[ delta ])

	for(var n in this.cls.o )
	{
		var pl2	=this.cls.o[n].pl

		if( pl === pl2 )	continue

		var seesoldloc	=pl2.sees(oldloc)

		if( pl2.sees(newloc) || seesoldloc)
		{
			pl2.cl.send("plmov" ,[ pl, delta, seesoldloc ])
		}
	}
}



/*
out. plclimb	=function( pl, dir )
{
	if( pl.cl )	pl.cl.s.clplclimb( dir )

	for(var n in this.cls.o )
	{
		var pl2	=this.cls.o[n].pl

		if( pl === pl2 )	continue

		if( pl2.sees(pl.loc) )
		{
			pl2.cl.s_plclimb( pl, dir )
		}
	}
}


out. rotobj	=function( pl, loc, dir, obj )
{
	for(var n in this.cls.o )
	{
		var pl2	=this.cls.o[n].pl

		if( pl2.sees(loc) )
		{
			pl2.cl.sendjson(["rotobj" ,[ pl.name ,loc ,dir ,obj.constructor.key ]])
		}
	}
}



out. movobj	=function( )
{
	
}


out. plactonobj	=function( pl, loc, objkey, act, params )
{
	for(var n in this.cls.o )
	{
		if( this.cls.o[n].pl.sees( loc ))
		{
			this.cls.o[n].send_actonobj( loc, objkey, act, params )
		}
	}
}



out. setplitem	=function( pl ,item )
{
	// var itemk	=item.constructor.key

	pl.cl?.send("setclplitem" ,item )

	this.sendplvis( pl ,"setplitem" ,[ pl.name ,pl.loc ,item ])
}*/
}

///////////////////////////////////////////////////////////////////////////////




/*
for(var funn in SSe.prototype)
{
	SSe.prototype["send_"+funn]	=SSe.prototype[funn]

	SSe.prototype["s_"+funn]	=SSe.prototype[funn]

	delete SSe.prototype[funn]
}*/