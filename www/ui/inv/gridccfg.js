import V from "../../shared/Vec.js"
import Col  from "../../shared/Color.js"



const cfga   =
{
    belt    :
    [
        new V(5,2)
        ,
        [238,40,66,38]
    ],
    seedbag :
    [
        new V(2,2)
    ],
    multi   :
    [
        new V(3,1)
    ],
    hands   :
    [
        new V(5,5)
    ]
}
const cfgo   ={}

for(var key in cfga )
{
    const a =cfga[key]

    const o =
    {
        csize    :a[0]
        ,
        cbg :Col.fromJSON( a[1] ?? [61,85,85,0.38] )
    }
    cfgo[key]   =o
}
export default cfgo