import newBlock from "../../www/shared/items/newBlock.js"


const Base	=newBlock()

export default class Block	extends Base
{
	static
	{
		this.dupacts()

		this.acts.drag[1]	=function run( nav ,pl ,dir ,newplloc )
		{
			Base.acts.drag[1].call( this , nav ,pl ,dir ,newplloc )

			const loc	=nav.gloc()

			if( newplloc )
			{
				nav.ggame().srv?.sendplvis3(
					
					loc ,pl.loc ,newplloc
					,
					pl ,"act" ,[ pl.name ,nav ,"drag" ,dir ,newplloc ]
				)
			}
			else
			{
				nav.ggame().srv?.sendplvis3(
					
					loc ,pl.loc ,loc.c().neighh(dir)
					,
					pl ,"act" ,[ pl.name ,nav ,"drag" ,dir ,newplloc ]
				)
			}
		}
	}
}
