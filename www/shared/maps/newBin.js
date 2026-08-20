import Loc	from "../Loc.js"


/** This file is the root of working with maps.
 * Each map has binary data and a map of objects.
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
 * */



/** Has all of the data to work with one value inside of each cell of the
 * binary map.
 * A lot of the optional values are calculated when creating Bin class.
@typedef {object}	BmapVal
@prop {string}	[key]	-Key name of the value. Can be created automatically
	from the property key which holds this object.
@prop {number}	bits	-Bit length of this value.
@prop {string[]}	[valsa]	-Ordered array of named values.
@prop {object<valkey :string, BmapVal|BmapSubd>}	[_condsub]	-For when
	different value calls for completely different properties of cell.
	For example, soil and water have different properties.
@prop {number}	[bin_i]	-Auto. Index of the typed array where the value is
	stored.
@prop {object<string, number>}	[valso]	-Auto. Automatically created reverse
	lookup of named values. Goes with "valsa".
@prop {number}	[offset]	-Auto. Automatically calculated bit offset from the
	beginning of cell in that typed array.
@prop {string[]}	[path]	-Auto. Used for intermediary building. When
	scanning bmap array the first time and flattening it to break into
	different typed arrays, the key path to this value is stored here. Later
	we can use it to build the proper bmap object tree. */



/** Defines a single value inside of the binary map header.
@typedef {[string ,number]}	HeaderVal
@prop {string}	0 -Kye name of the value
@prop {number}	1 -Valid bits number for TypedArray types. Only tested up to
	32 bits. */



/** Defines the kind of typed array ...
@typedef {object}	BmapBin
@prop {number}	size	-Size of the typed array in bits. Only tested up to 32.
@prop {BmapVal[]}	vals	-Array of values that are stored in this typed
	array. */



/** Object representing a typed array type and the bmap values that are
 supposed to go in it. For convenience, is simply called a bin.
 @typedef {{ size :number, vals :BmapVal[] }} TABin */


///////////////////////////////////////////////////////////////////////////////


/** 
 * @arg {number} id	-What kind of binary data is inside.
 * @arg {object<valkey :string ,BmapVal} bmapdef	-Usermade bit map. Look above.
 * @arg {HeaderVal[]} [structadd]	-Additional header values to add to the
 * 	default ones.
 * @return {Bin}	-Unique class for this bitmap. */

export default( id, bmapdef, structadd )=>class Bin	extends BinBase
{
	static id	=id

	/** The reason it's two dimensional is because _condsub breaks down value
	 * chain into different layers. Complicated to explain without drawing.
	 * @type {BmapBin[][]} */

	static bmapbins	=bmapdef ? build_bigbinlayers( bmapdef) : []
	
	static bmap	=build_bmap( this.bmapbins )

	static
	{
		if( structadd )	this._structarr	=BinBase._structarr.concat( structadd )

		this.build_structo()
	}
}


///////////////////////////////////////////////////////////////////////////////


/** Basic class divides the data like this:
 * [ code, id, r, loc, cells ]
 * code	-Defines the type of data inside the binary data.
	 * 1 - BinMap
	 * 2 - BinMapShift 
 * id	-Map type identifier.
 * r	-Radius
 * loc	-3 values for location
 * cells	-The actual cell data. */

class BinBase
{
	/**Defined in derived class.
	@static
	@var code */

	/**Code for how the cell data is structured.
	 * Defined in derived class.
	@static
	@var id */
	
	/** Defined in derived class.
	@static
	@var bmap */

	////----

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

	/** Defined in derived class
	@static
	@prop {BmapBin[]} bmapbins */

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

		for(var i =0, len =Bin.bmapbins.length ;i<len;i++)
		{
			var bmbin	=Bin.bmapbins[i]

			this.cells[i]	=new globalThis["Uint"+bmbin.size+"Array"]( buf, offset, clen )

			offset	+= clen * ( bmbin.size >> 3 )
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


	/** @return {number} - bytes per cell */

	static bpc()
	{
		var bpc	=0

		for(var bmbin of this.bmapbins )
		{
			bpc	+= (bmbin.size >> 3)
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

	if( first_splitbin === layers[0].at(-1) )	return layers

	for(var bins of layers )
	{
		if( bins.length < maxbinslen )	break

		const lastbin	=bins.at(-1)

		const splitbin	=split_bin_set( bins.at(-1) ,first_splitbin )

		if( ! splitbin )	return layers

		bins.splice( bins.length-1, 1, splitbin )
	}
	return layers
}

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

	fit_in_bins( bins ,setvals ,32 )

	if( condvals.length )
	{
		for(var condval of condvals )
		{
			for(var valk in condval.def )
			{
				const def	=condval.def[valk]

				const binsdup	=bins.map(( bin )=>dupbin( bin ))

				layers.push( ...build_bigbinlayers( def ,binsdup ))
				
				// Duplicate bin
			}
		}
	}
	else	layers.push( bins )

	return layers
}

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
			}
			bmapdef[k]	=val

			setvals.push( val )
		
			if( prop._condsub )
			{
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


function dupbin( bin )
{
	return {
		
		size	:bin.size
		,
		vals	:bin.vals.slice()
		,
		bitsused	:bin.bitsused
	}
}


function break_condsub( obj )
{
	var condvals	=[]

	for(var condval in obj )
	{



		const bmapdef	=obj[condval]

		for(var k in bmapdef )
		{
		}
	}
}

function bmapdef2arr( bmapdef )
{
	



	const bmapflat	=[]

	bmap_flat( bmapdef, bmapflat )

	var bmapbins	=fit_in_bins( bmapflat, 32 )

	return bmapbins
}


/** Sets offsets too */

function build_bmap( bmapbins )
{
	const bmap	={}

	for(var i =0, len =bmapbins.length;i<len;i++)
	{
		const bin	=bmapbins[i]

		var offset	=0

		for(var val of bin.vals )
		{
			if( val.condsubd )
			{
				for(var cond in val.condsubd )
				{
					let inval, inoffset	=0

					for(inval of val.condsubd[cond] )
					{
						inval.offset	=offset + inoffset

						build_keys( bmap, inval.path, inval )

						inval.bin_i	=i

						inoffset	+= inval.bits
					}
				}
			}
			else
			{
				val.offset	=offset

				build_keys( bmap, val.path, val )

				val.bin_i	=i
			}

			offset	+= val.bits
		}
	}

	return bmap
}


///////////////////////////////////////////////////////////////////////////////


/** Recursive function.
 * Also calculates valso !
 * Been a while. I think this flattens bmap somehow.
 * @arg {BmapVal[]} bmapao	-Array of values to flatten.
 * @arg {BmapVal[]} bmapflat	-Final array to add the flattened values to.
 * @arg {string} [pref=""]	-Don't use when called manually. Needed for recursion.
 * 	Is needed to build the path to the value in the bmap object tree later.
 * @return {number} -number of bits this bmap layer takes */

function bmap_flat( bmapao, bmapflat, pref ="" )
{
	/** How many bits does this layer take. */
	var bits	=0

	for(var val of bmapao )
	{
		if( val.subd )
		{
			// added pref here

			bits	+= bmap_flat( val.subd, bmapflat, pref+val.n+"_" )
		}
		else if( val.condsubd )
		{
			val.path	=pref

			let maxsize	=0

			for(let cond in val.condsubd )
			{
				let flat	=[]

				let size	=bmap_flat( val.condsubd[cond], flat, pref+cond+"_" ) //`%{bmapflat.at(-1).path}_${cond}_`

				val.condsubd[cond]	=flat

				if( size > maxsize )	maxsize	=size
			}

			val.bits	=maxsize

			bmapflat.push( val )
		}
		else
		{
			val.path	=pref+val.n

			val.valso	=build_valslookup( val.valsa ) // add condition

			bmapflat.push( val )

			bits	+= val.b
		}
	}

	return bits
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
			else
			{
				console.error("splitting bins - error", val )

				return bins	// should be empty
			}
		}
	}
	// bins.splice( bins.length-1, 1, split_bin( bins.at(-1) ))

	return bins//.flat()
}


/** Put o at path in root object */

function build_keys( root, path, o )
{
	path	=path.split('_')

	var prop	=root

	for(var i =0, len =path.length-1 ;i<len;i++)
	{
		var key	=path[i]

		if( ! prop[key] )
		{
			prop[key]	={}
		}

		prop	=prop[key]
	}

	prop[path[i]]	=o

	return root
}


///////////////////////////////////////////////////////////////////////////////


/** Just build a reverse lookup object from an array of values
 * @arg {string[]} valsa	-Array
 * @return {object<string, array_index :number>} */

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


/** Takes one bin and attempts to split it into smaller bins if possible
 * @arg {TABin} */

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
				return{ size :top ,vals :bin.vals }
			}

			bytes	<<= 1
		}
		else if( bitsum <= top )
		{
			var bins	=fit_in_bins( [] ,bin.vals, bytes<<2 )//8*bytes/2

			if( ! bins.length )	return bin

			return bins
		}
	}
	return bin
}


/** Get already split bin and try to split this bin the same way.
 * @arg {TABin} bin
 * @arg {TABin[]} splitbin */

function split_bin_set( bin, splitbin )
{

}