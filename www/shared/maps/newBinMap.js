import newBinSh	from "./newBin.js"


/** 
 * @arg id	-Is sent to newBin
 * @arg {bmap}	bmap	-Is sent to newBin
 * @arg {bitlen[]} typarrszs	-Is sent to newBin
 * @arg {class} [newBin]	-Which newBin to use.
 * @return {class}	-Proper round Bin which means it can have proper
 * 	Loc-to-index conversion. */

export default( id, bmap, typarrszs, newBin =newBinSh )=>
	
	class BinMap extends newBin( id ,bmap, typarrszs )
{
	static code	=1


	/** Either sets a given ArrayBuffer or creates new ones.
	 * @overload
	 * @arg {ArrayBuffer} buf
	 * @overload
	 * @arg {number} radius
	 * @arg {number} maxcells
	 * @arg {Loc} loc */

	constructor( ...args )
	{
		super()

		if( args[0] instanceof ArrayBuffer )	this.setbuf( ...args )

		else if( args[0] > 0 || args[1] > 0 )	this.newbuf( ...args )
	}



	///////////////////////////////////////////////////////////////////////////


	/** Has an algorithm of figuring out the size of the map.
	 * User can give either radius or maxcells.
	 * If both are given, the smaller one is used (check).
	 * @arg {Loc} loc	-Coordinates of center. */

	newbuf( r=0, maxc=0, loc )
	{
		const C	=this.constructor

		if( maxc>0 )
		{
			let maxr	=C.cells2r(maxc)

			if( !r || maxr<r )
			{
				r	=maxr
			}
		}
		if( ! r )
		{
			console.error('Wrong newbuf')
			
			return
		}
		const c	=C.r2cells( r )

		return super.newbuf( c , loc, r )
	}


	/** @return {number} -How many cells */

	setbuf( buf )
	{
		const C	=this.constructor

		super.setbuf( buf )

		if( this.cellsl !== C.r2cells( this.getr()) ) throw new Error()

		return this.cellsl
	}


	///////////////////////////////////////////////////////////////////////////



	/** @return {boolean}	-Is the location inside the map. */

	inside( v )
	{
		return this.getloc().disth(v) <= this.getr()
	}


	/** Where real magic happens. Algorithm invented by 
	 * Anton Adelson from Israel. antonadelson@gmail.com */

	ic( loc )
	{
		let r	=this.getr()

		let rsize	=r*(r+1)

		var v	=this.getloc().neg().addv(loc)

		return (v.x>=0 && v.y<0) * (v.x*r - v.y) +
			(v.y>=0 && v.z()<0) * (rsize + v.y*r - v.z()) +
			(v.z()>=0 && v.x<0) * (rsize*2 + v.z()*r - v.x);
	}


	/** Spirals from center to the outside and calls fun for each cell.
	 * @arg {(v: Loc, distance: number, map: any )=> boolean} fun	-
	 * 	Called for each cell inside the given radius from given center.
	 * 	map sent is the one given in the argument or this if not given.
	 *	DON'T CHANGE VALUES OF VECTOR IN FUN() !!!
	 *	If fun returns true then stop looping.
	 * @arg [r=mapRadius]
	 * @arg {Loc} [c=mapCenter]	-center from where to start looping
	 * @arg {*}	[map =this]	-Since the full map separates the binary data
	 * 	and object data, the map argument ensures the correct context is used.
	 * @returns {Loc}	-if fun returned true, returns the location
	 * 		where it happened*/

	fore( fun, r, c ,map =this )
	{
		var v, ir, dir, i

		r	??=this.getr()

		c	??=this.getloc()

		v	= c.c()

		if( fun( v ,0 ,map )) return v

		for(ir=1; ir<=r; ir++)
		{
			v.neighh( 4 )

			for(dir=0; dir<6; dir++)
			{
				for(i=0; i<ir; i++)
				{
					if( this.inside(v) )	// I can optimise this
					{
						if( fun( v ,ir ,map )) return v
					}
					v.neighh(dir)
				}
			}
		}
	}


	/** Similar to fore(). Look there for more info.
	 * Only goes through one ring.
	 * DON'T CHANGE VALUES OF VECTOR IN FUN() !!!
	 * If fun returns true then stop looping?
	 * @arg {function} fun -( loc, map )
	 * @returns {null|Loc}	-if fun returned true, returns the location
	 * 		where it happened. */

	forring( fun, r, c ,map )
	{
		map	??=this

		if( ! r )
		{
			return fun( c, map )
		}

		r	??=this.getr()

		c	??=this.getloc()

		var v	=c.clone()

		v.steph( 4, r )

		for(var dir=0; dir<6; dir++)
		{
			for(var i=0; i<r; i++)
			{
				if( this.inside(v) )
				{
					if( fun( v, map ))	return v
				}
				v.neighh(dir)
			}
		}
	}


	///////////////////////////////////////////////////////////////////////////


	/** Take radius and return number of cells in a hexagonal map. */

	static r2cells(r)
	{
		let cells=1

		for(let i=0; i<r; i++)
		{
			cells	+= 6*(i+1)
		}
		return cells
	}


	/** Take number of cells and return the radius needed to fit them. */

	static cells2r(cells)
	{
		let r	=0

		for(let i=6 ; i<=cells ; i+=6*(r+1) )
		{
			r	++
		}
		return r
	}
}