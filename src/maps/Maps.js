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


	/** Call if you're not sure if the correct folders are made.
	 * Throws error. */

	async init()
	{
		if( ! await ensuredir( this.conf.dir ))
		{
			throw new Error( `Could not make map dir: ${this.conf.dir}` )
		}
	}


	/** If somehow canopy data was lost but ground exists, for now
	 * it's possible to generate canopy automatically from ground.
	 * @return {ReadPlLoc[]|undefined} -array with player locations if
	 * 	they exist. */

	async load()
	{
		const dir	=this.conf.dir

		const loadres	=await Promise.all(
			[
				this.gr.load( dir )
				,
				this.trees.load( dir )
			])
		if( ! this.gr.bin )
		{
			console.warn( `Ground files were not found` )

			return
		}
		else if( ! this.trees.bin )
		{
			console.log( `Generating new trees map from ground map.`)

			this.tr.gen( this.gr )

			this.trees.save(this.conf.dir)
		}
		const pllocs	=loadres.filter(Boolean).flatMap(( lr )=> lr.pls )
		
		return pllocs
	}



	genriver()
	{
		this.gr.genriver( this.conf.size.r, this.conf.size.maxcells )

		this.save()
	}


	/** Generate a new desert map. */

	gendesert()
	{
		this.game.mode	="desert"

		this.gr.gendesert( this.conf.size.r, this.conf.size.maxcells )

		this.tr.gen( this.gr )

		// this.save()
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


	
	///////////////////////////////////////////////////////////////////////////


	/** Convert child's path msg to game object */

	pmsg2obj( locj )	{return LocC.setj( locj )}
}