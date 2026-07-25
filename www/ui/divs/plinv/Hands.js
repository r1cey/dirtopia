import DivGo	from "../../DivGameObj.js"

// import GridC from "./Cell.js"


export default class Hands extends DivGo
{
    constructor( hands ,dad )
	{
		super( hands ,dad ,dad.el.querySelector("hands") )

		
	}
}