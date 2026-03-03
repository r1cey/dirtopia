import GridEl from "./GridEl.js"


export default class GridItem	extends GridEl
{
	t 	=new Touch( this)


	movmod()
	{
		console.log("AAA")
	}
}



class Touch
{
	down	=false
}