import Loc	from "../Loc.js"


/** This file is the root of working with maps.
 * Each map has binary data and a JS object.
 * Specifically this file deals with binary data.
 * There are two kinds of binary maps: round and just an array.
 * By round we mean hex shaped map wth a radius.
 * This file doesn't deal with round maps, it just has an array of len cells.
 * For round maps, look into "Map" postfix of files.
 * 
 * Some basics:
 * * To ease on prototyping, there's a system of mapping which bits do what.
 * 		Called bmap or bitmap. Don't confuse with BinMap class.
 * * Each cell can be spread across multiple typed arrays. Bmap is supposed
 * 		to manage that. Typed arrays can be of different size to save on space.
 * * Inside of bmap, there can be entire chains of values dependant on the
 * 		value of a certain property. These chains are called conditional
 * 		subdivisions and they create a lot of complexity in bmap management.
 *  * To use this system use calc_bmap_typarrs function. And then give the data
 * 		when building Bin class. */



/** Has all of the data to work with one value inside of each cell of the
 * binary map.
 * A lot of the optional values are calculated when creating Bin class.
@typedef {object}	BmapVal
@prop {string}	[key]	-Key name of the value. Can be created automatically
	from the property key which holds this object.
@prop {number}	bits	-Bit length of this value.
@prop {string[]}	[valsa]	-Ordered array of named values.
@prop {{[condkey :string] :{[valkey :string] :BmapVal}}}	[_condsub]	-
	For when different value calls for completely different properties of cell.
	For example, soil and water have different properties.
@prop {number}	[bin_i]	-Auto. Index of the typed array where the value is
	stored.
@prop {{[valkey :string] :val }}	[valso]	-Auto. Automatically created reverse
	lookup of named values. Goes with "valsa".
@prop {number}	[offset]	-Auto. Automatically calculated bit offset from the
	beginning of cell in that typed array. */



/** Defines a single value inside of the binary map header.
@typedef {[string ,number]}	HeaderVal
@prop {string}	0 -Key name of the value
@prop {number}	1 -Valid bits number for TypedArray types. Only tested up to
	32 bits. */



/** Object representing a typed array type and the bmap values that are
 supposed to go in it. For convenience, is simply called a bin.
@typedef {object}	TABin
@prop {number}	size	-Size of the typed array in bits. Only tested up to 32.
@prop {BmapVal[]}	vals	-Array of values that are stored in this typed
	array. */


///////////////////////////////////////////////////////////////////////////////


/** 
 * @arg {number} id	-How binary data inside is mapped to cells and their props.
 * @arg {bmap} bmap	-Fully calculated bit-map object.
 * @arg {bitlen[]} typarrszs	-Array of bit lengths for each Typed Array.
 * @arg {HeaderVal[]} [structadd]	-Additional header values to add to the
 * 	default ones. For example, Map Shifts have "dir" value added to the header.
 * @return {Bin}	-Unique class for this bitmap. */

export default( id, bmap, typarrszs, structadd )=>class Bin	extends BinBase
{
	static id	=id

	static
	{
		if( bmap )	this.bmap	=bmap

		if( typarrszs )	this.typarrszs	=typarrszs

		if( structadd )	this._structarr	=BinBase._structarr.concat( structadd )

		this.build_structo()
	}
}


///////////////////////////////////////////////////////////////////////////////


/** So this is the most basic class representing the binary data that goes
 * inside a map. Most important values are headers, cells, and the bit map.
 * 
 * Both header and cells are stored in a single ArrayBuffer. What's not the
 * header is divided into multiple TypedArrays of potentially different sizes.
 * Because each cell can be split into multiple TypedArrays.
 * 
 * Then bit map is used to map useful properties of the map to the typarrs and
 * the bit offset and bit length.
 * 
 * Derived classes can add to header but basic buffer data looks like this:
 * [ code, id, r, loc, cells in typed array[0], cells in typed array[1], ... ]
 * r	-Radius
 * loc	-3 values for location
 * cells	-The actual cell data split into typed arrays. */

class BinBase
{
	/** Code for what kind of map is it?
	 * 1 - BinMap
	 * 2 - BinMapShift */
	static code

	/** Identifier for which kind of data is inside each cell.
	 * Is the map ground or trees, for example */
	static id
	
	/** @type {object<valkey ,BmapVal>} */
	static bmap

	////----

	/** @type {bitlen[]}	-Array of bit lengths for each Typed Array*/
	static typarrszs

	/** Array of TypedArrays pointing to the same buffer
	 * but at offsets so don't overlap.
	 * @type {Uint*Array[]} */
	cells	=[[]]

	/**Number of cells.*/
	cellsl	=0

	////----

	/** TypedArrays for bin data */
	arrs	={}

	/** Structure of the header element of binary data.
	 * Code value has to come first. Id value has to come second.
	 * @type {HeaderVal[]} */
	static _structarr	=
		[ ["code",16],["id",16],["r",16],["loc",16] ]

	/** Reverse lookup for data structure values */
	static _structo	={ }

	/** tricky buffer, ONLY access it through
	 * getloc() because it can be changed to anything.
	 * @type {Loc} */	
	_loc	=new Loc()


	///////////////////////////////////////////////////////////////////////////



	getcode( buf )
	{
		return new DataView( buf )["getUint"+this._structarr[0][1]](0, true)
	}

	getid( buf )
	{
		return new DataView( buf, this._structarr[0][1]>>3 )["getUint"+this._structarr[1][1]](0, true)
	}


	/**
	 * @arg {number} clen	-Number of cells
	 * @arg {Loc} [loc =new Loc(0,0,0)]	-Coordinate of map center.
	 * 	It's not used in this class but is needed to be stored in buffer
	 * 	regardless for derived classes.
	 * @arg {number} r	-Radius of the map. Same as loc.
	 * @return {ArrayBuffer} */

	newbuf( clen, loc =new Loc(0,0,0), r )
	{
		const C	=this.constructor

		const buf	=new ArrayBuffer( C.headlen() + clen * C.bpc() )

		BinBase.prototype.setbuf. call(this, buf, clen )

		this.arrs.code[0]	=C.code
		this.arrs.id[0]	=C.id
		this.setr( r )
		this.setloc( loc )

		return buf
	}


	/**
	 * @arg {ArrayBuffer}	buf
	 * @arg {number}	[clen]
	 * @return {BinBase} */

	setbuf( buf, clen )
	{
		const Bin	=this.constructor

		this.setarrs( buf )

		clen	??=Bin.getlen( buf )

		var offset	=Bin.headlen()

		for(let i =0, len =Bin.typarrszs.length ;i<len;i++)
		{
			const bitlen	=Bin.typarrszs[i]

			this.cells[i]	=new globalThis["Uint"+bitlen+"Array"]( buf, offset, clen )

			offset	+= clen * ( bitlen >> 3 )
		}
		this.cellsl	=clen

		return this
	}



	getbuf()
	{
		return this.cells[0].buffer
	}


	///////////////////////////////////////////////////////////////////////////


	/** Remnants of previous DataView solution */

	get( dataname )
	{
		return this.arrs[dataname][0]
	}

	set( dataname, val )
	{
		this.arrs[dataname][0]	=val
	}



	getr()
	{
		return this.arrs.r[0]
	}
	setr( val )
	{
		this.arrs.r[0]	=val
	}



	setloc( loc )
	{
		this.arrs.loc[0]	=loc.h
		this.arrs.loc[1]	=loc.x
		this.arrs.loc[2]	=loc.y
	}

	/** Location instance returned is only changed when this function is called.
	 * Don't reuse it outside of class.
	 * Designed like this just to save on garbage collection */

	getloc()
	{
		const loc	=this.arrs.loc

		return this._loc.setxy( loc[1], loc[2], loc[0] )
	}


	/**
	 * @arg {BmapVal} bmapv */

	setval_str( ic, bmapv, valstr )
	{
		this.setval( ic, bmapv, bmapv.valso[valstr] )
	}


	/** Similar to getval
	 * @arg {BmapVal} bmapv */

	setval( ic, bmapv, val )
	{
		var data	=this.cells[bmapv.bin_i][ic]

		this.cells[bmapv.bin_i][ic]	=Bin.sval( data, bmapv.offset, bmapv.bits, val )
	}


	/** Get binary value.
	 * Doesn't check if cond subdivision choice matches the written value in the buffer.
	 * Use separate method for that. */

	getval( ic ,bmapv )
	{
		return Bin.gval( this.cells[bmapv.bin_i][ic], bmapv.offset, bmapv.bits )
	}
	static
	{
		this.prototype. gval	=this.prototype. getval
	}


	getval_str( ic ,bmapv )
	{
		const val	=this.getval( ic, bmapv )

		return bmapv.valsa[val]
	}
	static
	{
		this.prototype. gvaln	=this.prototype. getval_str
	}


	/** Get the maximum value that can be stored in bin map.
	 * Note how it's number of values minus 1. */

	static getmaxval	=function( bmapv )
	{
		return ( 1 << bmapv.bits ) - 1
	}


	/** this.arrs and valarr must have same length
	 * @arg {number[]} valarr -Array of values to set in the cell.
	 * 	Because each cell is usually split into multiple typedarrays of different
	 * sizes. This function sets all of them at once.
	 * @todo AFTER RELEASE, GET RID OF TO MAKE FASTER */

	setcell( ic, valarr )
	{
		for(var i=0,len= this.cells.length ;i<len;i++)
		{
			this.cells[i][ic]	=valarr[i]
		}
	}


	/** Get binary value of a cell.
	 * @todo AFTER RELEASE, GET RID OF TO MAKE FASTER
	 * @return {number[]} - Array of values from the cell. */

	getcell( ic )
	{
		const vals	=[]

		for(var cells of this.cells )
		{
			vals.push( cells[ic] )
		}
		return vals
	}


	///////////////////////////////////////////////////////////////////////////////



	static getlen( buf )
	{
		return ( buf.byteLength - this.headlen() ) / this.bpc()
	}


	///////////////////////////////////////////////////////////////////////////////


	/** Get value out of code from start bit and len bits long */

	static gval(code ,start ,len )
	{
		var val	=code >> start

		return val	&= ~((~0)<<len)
	}


	/** Rewrite value in code. Trunctate the value to length. */

	static sval( code, start, len, val )
	{
		var mask	=~((~0)<<len)

		mask	=~(mask<<start)

		code	&= mask

		return code	|= Bin.gval(val,0,len) << start
	}


	///////////////////////////////////////////////////////////////////////////////


	/** @todo Replace with variable  */

	static headlen()
	{
		var len	=0

		for(var val of this._structarr )
		{
			len	+= val[1] + (val[0]==="loc")*(val[1]<<1)
		}
		return Math.ceil( (len >> 3) / 4 ) << 2
	}


	/** @return {number} - BYTES per cell */

	static bpc()
	{
		var bpc	=0

		for(var bitlen of this.typarrszs )
		{
			bpc	+= bitlen >> 3
		}
		return bpc
	}


	///////////////////////////////////////////////////////////////////////////


	/** Convert ._structarr to ._structo object for reverse lookup */

	static build_structo()
	{
		const C	=this

		for(var val of C._structarr )
		{
			C._structo[val[0]]	=val[1]
		}
	}


	/** this.arrs are typed arrays pointing to data in buffer header */

	setarrs( buf )
	{
		const C	=this.constructor

		var start	=0

		for(var dvvals of C._structarr )
		{
			var name	=dvvals[0]

			var len	=dvvals[1]
			
			if(name==="loc")
			{
				len	*= 3

				this.arrs.loc	=new globalThis["Int"+dvvals[1]+"Array"]( buf, start>>3, 3 )
			}
			else	this.arrs[name]	=new globalThis["Uint"+dvvals[1]+"Array"]( buf, start>>3, 1 )

			start	+= len
		}
	}
}

///////////////////////////////////////////////////////////////////////////////


/** There's no need to return bitmap since we reuse the bmapdef object.
 * @return {bitlen[]} -Array of bit lengths for each Typed Array */

export function calc_bmap_typarrs( bmapdef )
{
	const layers	=build_binlayers( bmapdef )

	const typarrszs	=layers[0].map(( bin )=>bin.size )
	
	bins2bmap( layers, bmapdef )

	return typarrszs
}


///////////////////////////////////////////////////////////////////////////////


/** Complicated function. First we build bins at the maximum size.
 * Then we check if the last bin in the largest layer can be split into smaller
 * bins. If it can, we split it and then check if the other layers can be split
 * in the same way. If they can, we split them too. If not, we return the
 * original layers.
 * @arg {object<valkey ,BmapVal>} bmapdef	-Usermade bit map. Is fixed with
 * 	proper BmapVal objects.
 * @return {BmapBin[][]} -Array of arrays of bins. Each array is a layer of
 * 	bins. Multiple layers happen whenever conditional split occurs. */

function build_binlayers( bmapdef )
{
	const layers	=build_bigbinlayers( bmapdef )

	layers.sort(( a ,b )=>
	{
		const dlen	=b.length - a.length

		if( dlen === 0 )	return b.at(-1).bits - a.at(-1).bits

		return dlen
	})
	const maxbinslen	=layers[0].length

	const first_splitbin	=split_bin( layers[0].at(-1) )

	if( first_splitbin?.[0] === layers[0].at(-1) )	return layers

	for(var bins of layers )
	{
		if( bins.length < maxbinslen )	break

		const splitbin	=split_bin_set( bins.at(-1) ,first_splitbin )

		if( ! splitbin )	return layers

		bins.splice( -1, 1, ...splitbin )
	}
	return layers
}


/** Sets offsets, bin indices, stuff like that.
 * Since bins' vals already has pointrs to bmap vals, we don't need a dedicated
 * bmap instance. We just return it for convenience.
 * @arg {TABin[][]} bmapbins
 * @arg bmap
 * @return bmap */

function bins2bmap( bmapbins ,bmap )
{
	for(var layer of bmapbins )
	{
		for(var i =0, len =layer.length;i<len;i++)
		{
			const bin	=layer[i]

			let offset	=0

			for(var val of bin.vals )
			{
				val.bin_i	=i

				val.offset	=offset

				offset	+= val.bits
			}
		}
	}
	return bmap
}


///////////////////////////////////////////////////////////////////////////////


/** Build data catching bin layers. The bins used are full sized, not fully
 * optmized.
 * Recursive. First bins set is empty
 * @arg {object<valkey ,BmapVal>} bmapdef
 * @arg {TABin[]} [bins =[]] */

function build_bigbinlayers( bmapdef ,bins =[] )
{
	const layers	=[]

	/** The values which are set and not conditioned */
	const setvals	=[]

	const condvals	=[]

	breakdown_bmapdef( bmapdef, setvals, condvals )

	if( ! fit_in_bins( bins ,setvals ,32 ))
	{
		console.error("build_bigbinlayers - error: values don't fit in bins" ,
			
			bmapdef )

		return layers
	}
	if( condvals.length )
	{
		for(var condval of condvals )
		{
			for(var valk in condval.def )
			{
				const def	=condval.def[valk]

				// Duplicate the bins so we don't overwrite the original ones.

				const binsdup	=bins.map(( bin )=>dupbin( bin ))

				layers.push( ...build_bigbinlayers( def ,binsdup ))
			}
		}
	}
	else	layers.push( bins )

	return layers
}


///////////////////////////////////////////////////////////////////////////////


/** Bmapdef gets replaced with properly defined objects */

function breakdown_bmapdef( bmapdef, setvals, condvals )
{
	for(var k in bmapdef )
	{
		var prop	=bmapdef[k]

		if( prop.bits )
		{
			const val	=
			{
				k
				,
				bits	:prop.bits
				,
				valsa	:prop.valsa
				,
				valso	:build_valslookup( prop.valsa )
				,
				offset	:null
				,
				bin_i	:null
				,
				_condsub	:prop._condsub
			}
			bmapdef[k]	=val

			setvals.push( val )
		
			if( prop._condsub )
			{
				// Dad is not needed it seems. May get rid of the entire
				// surrounding object.

				condvals.push(
				{
					dad	:val
					,
					def	:prop._condsub
				})
			}
		}
		// Then a collection of values.
		else
		{
			breakdown_bmapdef( prop, setvals, condvals )
		}
	}
}


/** Duplicate a bin */

function dupbin( bin )
{
	return {
		
		size	:bin.size
		,
		vals	:bin.vals.slice()
		,
		bits	:bin.bits
	}
}


/**	Splits an array of bmap values into multiple bins of a certain size.
 * @return {TABin[] } */

function fit_in_bins( bins ,vals, binsize =32 )
{
	vals.sort(( a, b )=> b.bits-a.bits )

	// const	bins	=[]

	for(var val of vals )
	{
		let bestbin	=null

		let mingap	=binsize

		for(var bin of bins )
		{
			const bitsused	=bin.vals.reduce(( offset, val )=> offset+val.bits , 0 )

			if( bitsused + val.bits <= bin.size )
			{
				const gap	=bin.size - ( bitsused + val.bits )

				if( gap < mingap )
				{
					mingap	=gap

					bestbin	=bin
				}
			}
		}
		if( bestbin )
		{
			bestbin.vals.push( val )

			bestbin.bits	+= val.bits
		}
		else
		{
			if( val.bits <= binsize )
			{
				bins.push(
				{
					size	:binsize
					,
					vals	:[ val ]
					,
					bits	:val.bits
				})
			}
			// if nothing fits
			else
			{
				return
			}
		}
	}
	return bins
}


/** Takes one bin and attempts to split it into smaller bins if possible.
 * There's cheating here since we assume that maximum size is 32 bits
 * so not many splitting options are here. Either [8], [16], or [16,8].
 * In any case, even if can't split, return array with any appropriate bins.
 * @arg {TABin[]} */

function split_bin( bin )
{
	var max	=bin.size

	// var bitsum	=bin.vals.reduce(( offset, val )=> offset+val.bits , 0 )

	const bitsum	=bin.bits

	var bytes	=1

	for(var top =8 ; top <= max ; top += 8 )
	{
		if( bytes<<3 === top )
		{
			if( bitsum <= top )
			{
				const newbin	=dupbin( bin )

				newbin.size	=top

				return[ newbin ]
			}
			bytes	<<= 1
		}
		else if( bitsum <= top )
		{
			const bins	=fit_in_bins( [] ,bin.vals, bytes<<2 )//8*bytes/2

			if( ! bins )	return[ bin ]

			const lastbin	=split_bin( bins.at(-1) )

			return[ bins[0] ,lastbin[0] ]
		}
	}
	return[ bin ]
}


/** Get already split bin and try to split this bin the same way.
 * @arg {TABin} bin
 * @arg {TABin[]} splitbins */

function split_bin_set( bin, splitbins )
{
	var finalbins	=[]

	var nextbins	=[ bin ]

	for(var splbin of splitbins )
	{
		const bins	=fit_in_bins( [] ,nextbins[0].vals, splbin.size )

		if( ! bins )	return

		finalbins.push( bins[0] )

		nextbins	=bins.slice( 1 )

		if( ! nextbins.length )	break
	}
	return finalbins
}


///////////////////////////////////////////////////////////////////////////////


/** Just build a reverse lookup object from an array of values
 * @arg {string[]} valsa	-Array
 * @return {{[valkey :string] :val }} */

function build_valslookup( valsa )
{
	if( ! valsa )	return

	const valso	={}

	for(var iv =0,lenv= valsa.length ;iv<lenv;iv++)
	{
		if(typeof valsa[iv] == "string" )
		{
			valso[valsa[iv]]	=iv
		}
	}
	return valso
}