// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const router = express.Router()

// - [ ] `[GET] /api/actions`
//   - Returns an array of actions (or an empty array) as the body of the response.
router.get("/", async (req,res,next)=>{
    try{
        const actions = await Action.get()
        res.status(200).json(actions)
    
    }catch{(error) =>
        next(error)
    }
})



// - [ ] `[GET] /api/actions/:id`
//   - Returns an action with the given `id` as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.

router.get("/:id", async (req,res,next)=>{
    try{
        const action = await Action.get(req.params.id)

        if(!action){
            res.status(404).json({message: `no project with id of: ${req.params.id}`})
          }else{
            res.status(200).json(action)
          }

    }catch{(error) =>
        next(error)
    }
})




// - [ ] `[POST] /api/actions`
//   - Returns the newly created action as the body of the response.
//   - If the request body is missing any of the required fields it responds with a status code 400.
//   - When adding an action make sure the `project_id` provided belongs to an existing `project`.

  router.post("/", async (req, res, next)=>{
    try{
      const {project_id,description,notes,completed} = req.body
      

      if(!project_id || !notes || !description){
        res.status(400).json( {messaage: "the Name and Description are both required"} )
      }else{
        const newAction = await Action.insert({project_id,description,notes,completed})
        res.status(200).json(newAction)
      }

    }catch{(error) =>
      next(error)
    }
  })

// - [ ] `[PUT] /api/actions/:id`
//   - Returns the updated action as the body of the response.
//   - If there is no action with the given `id` it responds with a status code 404.
//   - If the request body is missing any of the required fields it responds with a status code 400.


router.put("/:id", (req,res,next)=>{

    const {id} = req.params
    const { project_id, description, notes, completed } = req.body
    if( !project_id || !description ||!notes || !completed ){
       res.status(400).json({message: "missing an input"}) 
                
    }else{
        Action.update(id,{ project_id, description, notes, completed })
            .then(action=>{
                if(action){
                    res.status(200).json(action)
                }else{
                    res.status(404).json({message: `there is no action with an id of ${id}`})
                }
            })
    }
}) 
// - [ ] `[DELETE] /api/actions/:id`
//   - Returns no response body.
//   - If there is no action with the given `id` it responds with a status code 404.

router.delete("/:id", async (req,res,next)=>{
    try{
      const removedAction = await Action.remove(req.params.id)
  
      if(!removedAction){
        res.status(404).json({message: `No Project with id of ${req.params.id}`})
      }else{
        res.status(200).json({message: "deleted"})
      }
      
    }catch{(error) =>
      next(error)
    }
  })



module.exports = router