import * as fs	from '../fs.js'
import shMaps	from '../../www/shared/maps/Maps.js'

import Ground from './Ground.js'
import Trees from './Canopy.js'

import { ensuredir }	from "../fs.js"
import LocC from '../LocCell.js'


/** Adds Map saving and reading from shared Maps. */

export default class Ms extends shMaps
{
	conf	=
	{
		size	:
		{
			maxcells	:40000000
			,
			r	:150
		}
		,
		dir	:"./maps/"
	}

	static Ground	=Ground

	static Trees	=Trees


	///////////////////////////////////////////////////////////////////////////


	/** Returns obj with correct player locations.
	 * { [plname] :loc } */

	async load()
	{
		const dir	=this.conf.dir

		if( ! (await ensuredir(dir) /*&& await this.game.pls.init()*/ ))
		{
			return false
		}
		const pllocs	=await Promise.all(
			[
				this.gr.read( this.conf.dir )
				,
				this.trees.read( this.conf.dir )
			])
		if( ! this.gr.bin )
		{
			// console.log( `Ground files were not found` )
		}
		else if( ! this.trees.bin )
		{
			console.log( `Generating new trees map from ground map.`)

			this.tr.gen( this.gr )

			this.trees.save(this.conf.dir)
		}
		const errorlocs	=Ms.mergepllocs( pllocs )

		const errormaps	=new Set()

		for(const[ pln ,plloc ] of errorlocs )
		{
			const map	=this.loc2map( plloc )

			errormaps.add( map )

			map.obj.del( plloc ,"pl" )
		}
		for(const map of errormaps )
		{
			map.save( this.conf.dir )
		}
		Object.assign( this.jsonlocs.pl ,pllocs[0] )
		
		// return pllocs[0]
	}



	genriver()
	{
		this.gr.genriver( this.conf.size.r, this.conf.size.maxcells )

		this.save()
	}

	gendesert()
	{
		this.game.mode	="desert"

		this.gr.gendesert( this.conf.size.r, this.conf.size.maxcells )

		this.tr.gen( this.gr )

		this.save()
	}


	///////////////////////////////////////////////////////////////////////////////



	async save()
	{
		const proms	=
		[
			this.gr.save(this.conf.dir)
			,
			this.trees.save(this.conf.dir)
		]
		return await Promise.allSettled( proms )
	}


	/** When player moves, get the additional cells he sees. */

	gshiftboards( loc, r, dir )
	{
		return { gr :this.gr.newshiftboard( loc, r, dir ),
					tr :this.tr.newshiftboard( loc, r, dir ) }
	}


	///////////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////////////


	/** @arg [] pllocs
	 * Merges locs into first array member. Returns errorlocs if conflicts happen. */

	static mergepllocs( pllocs )
	{
		const errlocs	=[]

		const root	=pllocs[0]

		for(var i= 1 ;i< pllocs.length ;i++)
		{
			for( pln in pllocs[i] )
			{
				if( root[pln] )
				{
					errlocs.push([ pln ,pllocs[i][pln] ])
				}
				else
				{
					root[pln]	=pllocs[i][pln]
				}
			}
		}
		return errlocs
	}

	
	///////////////////////////////////////////////////////////////////////////


	/** Convert child's path msg to game object */

	pmsg2obj( locj )	{return LocC.setj( locj )}
}