import newJable from "../newJsonable.js";

import newPathable from "../newPathable.js";



export default function( Base )
{
	class Inv extends newPathable( newJable( Base ))
	{
		inv	={}

		

		isempty(){ for(var k in this.inv) return true; return false }



		additem( item )
		{
			var key	=item.gkey()

			var invobj	=this.inv[key]

			if( item.isstck )
			{
				if( invobj )	invobj.len	+= item.len

				else	this.inv[key]	=item
			}
			else
			{
				if( invobj )	invobj[item.id]	=item

				else	this.inv[key]	={ [item.id] :item }
			}
		}



		delitem( item ,len ,nav )
		{
			var key	=item.gkey()

			var invobj	=this.inv[key]

			if( item.isstck )
			{
				invobj.len	-= len

				if( invobj.len <= 0 )	delete this.inv[key]
			}
			else
			{
				delete invobj[item.id]

				for(var id in invobj )
				{
					var isused	=true

					break
				}
				if( ! isused )	delete this.inv[key]
			}
			if( this.isempty() )
			{
				return nav.at(-2).cnt2stck?.( this ,nav ,nav.length - 2 )
			}
		}

		

		msg2navo( afrom ,i ,ato )
		{
			var navo	=this.inv[afrom[i]]

			if( navo.iscnts() )
			{
				ato.push( navo.o[afrom[i+1]] )

				return 1
			}
			ato.push( navo )
		}
	}


	return Inv
}