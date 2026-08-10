import newBlock from "../../www/shared/items/newBlock.js"


const Base	=newBlock()

export default class Block	extends Base
{
	static
	{
		this.dupacts()

		this.acts.drag[1]	=function run( nav ,pl ,dir ,newplloc )
		{
			const oldplloc	=pl.loc.c()

			Base.acts.drag[1].call( this , nav ,pl ,dir ,newplloc )

			const oldloc	=nav.gloc()

			if( newplloc )
			{
				nav.ggame().srv?.sendplvis3(
					
					oldloc ,oldplloc ,newplloc
					,
					pl ,"actpl" ,[ pl.name ,nav ,"drag" ,dir ,newplloc ]
				)
			}
			else
			{
				nav.ggame().srv?.sendplvis3(
					
					oldloc ,oldplloc ,oldloc.c().neighh(dir)
					,
					pl ,"actpl" ,[ pl.name ,nav ,"drag" ,dir ,newplloc ]
				)
			}
		}
	}
}
