// Write your "projects" router here!
const express = require('express')

const Project = require('./projects-model')

const router = express.Router()



// router.get('/', (req, res) => {
/*
- [ ] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
    */
router.get('/', async (req, res, next)=>{
    try{
        const projects = await Project.get()
        res.status(200).json(projects)
    
    }catch{(error) =>
        next(error)
    }
})

/*
- [ ] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  */

  router.get('/:id', async (req, res, next)=>{
    try{
        const project = await Project.get(req.params.id)
        if(!project){
          res.status(404).json({message: `no project with id of: ${req.params.id}`})
        }else{
          res.status(200).json(project)
        }
    }catch{(error) =>
        next(error)
    }
  })
  

  /*
- [ ] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  */

  router.post("/", async (req, res, next)=>{
    try{
      const {name,description,completed} = req.body
      

      if(!name || !description){
        res.status(400).json( {messaage: "the Name and Description are both required"} )
      }else{
        const newProject = await Project.insert({name,description,completed})
        res.status(200).json(newProject)
      }

    }catch{(error) =>
      next(error)
    }
  })



  /*
- [ ] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
  */

  
  router.put("/:id", async (req,res,next)=>{

    const {id} = req.params
    const {name, description, completed } = req.body
    if( !name || !description || completed != false && completed != true ){
       res.status(400).json({message: "missing an input"}) 
                
    }else{
       await Project.update(id,{ name, description, completed })
            .then(project=>{
                if(project){
                    res.status(200).json(project)
                }else{
                    res.status(404).json({message: `there is no project with an id of ${id}`})
                }
            })
    }
}) 



  /*
- [ ] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
  */
router.delete("/:id", async (req,res,next)=>{
  try{
    const removedProject = await Project.remove(req.params.id)

    if(removedProject){
      res.status(200).json({message: "deleted"})
    }else{
      res.status(404).json({message: `No Project with id of ${req.params.id}`})
    }
    
  }catch{(error) =>
    next(error)
  }
})




  /*
- [ ] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.
  */

  router.get('/:id/actions', async (req, res, next)=>{
    try{
        const projectActions = await Project.getProjectActions(req.params.id)
        if(!projectActions){
          res.status(404).json({message: `no project with id of: ${req.params.id}`})
        }else{
          res.status(200).json(projectActions)
        }
    }catch{(error) =>
        next(error)
    }
  })


  module.exports = router