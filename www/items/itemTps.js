import * as baseTps from "./baseTps.js"

import newitTps from "../shared/items/newitemTps.js"

import Loc from "../shared/Loc.js"



const itTps	=newitTps( baseTps )


itTps.dewd	=class Dewd extends itTps.dewd
{
	draw( can, loc, vbuf )
	{
		const ctx	=can.ctx

		ctx.save()

		vbuf.set(loc).tosqc(can)

		ctx.translate( vbuf.x, vbuf.y )

		ctx.rotate( -Loc.rad60 * (this.dir+1) )

		ctx.translate( -vbuf.x, -vbuf.y )
	
		can.drawimg( loc, can.imgs().o.dewd, 1, vbuf )

		ctx.restore()
	}
}



///////////////////////////////////////////////////////////////////////////////



export default itTps