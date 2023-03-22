const Stories = require('../models/storiesModel')

//GET //for all alumni
// const getAllStories = async (req, res, next) => {
//     try {
//         const stories = await Stories.find({}); 
//         return res.status(200).json(stories);
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//       }


// }

//GET //for all alumni
const getAllStories = async (req, res, next) => {
    const PAGE_SIZE = 4;
    const page = parseInt(req.query.page)-1 || 0;
    let sortField = req.query.sort;

    let sortCriteria = {};
    if (sortField === "date") {
    if (req.query.order === "asc") {
        sortCriteria.date = 1; 
    } else {
        sortCriteria.date = -1; 
    }
    } else if (sortField === "popularity") {
    sortCriteria.popularity = -1; 
    }
    
    try{
    const total = await Stories.countDocuments({});
    const stories = await Stories.find({}).sort(sortCriteria).limit(PAGE_SIZE).skip(PAGE_SIZE*page);
    res.status(200).json({
        totalPages: Math.ceil(total/PAGE_SIZE),
        stories,
    });
    }catch(error){
        return res.status(500).json({ error: error.message });
    }


}

//GET // ALL STORIES FOR A SPECIFIC alumni
const getStories = async (req,res,next)=> {
    const userERP = req.params.ERP;

    let stories;
    try {
      stories = await Stories.find({ ERP: userERP });
    } catch (err) {
      return  res.status(500).json({ error: "Fetching stories failed, please try again later" });
    }
  
    if (!stories || stories.length === 0) {
       return res.status(404).json({ error: "Could not find stories for the provided user ERP" });
    }
  
    return res.json({
      stories: stories.map((story) => story.toObject({ getters: true })),
    });

    }

//GET A SPECIFIC STORY
const getStoryById = async (req,res,next)=> {
    const storyId = req.params.sid;

    let story;
    try {
      story = await Stories.findById(storyId);
    } catch (err) {
       return res.status(500).json({ error: "Something went wrong, could not find story" });
    }
  
    if (!story) {
       return res.status(404).json({ error: "Could not find story for the provided id" });
    }
  
    return res.json({ story: story.toObject({ getters: true }) });
}

//POST
const createStories = async (req, res , next) => {

    const stories =  new Stories({
        ERP: req.userData.userERP,
        title: req.body.title,
        content: req.body.content,
        Name: req.userData.userName
    })

    try{
    await stories.save()
    return res.json(stories);

    }catch(err){
       return res.json("Failure to create story: " + err)
    }
    
}

//PATCH
const updateStories = async (req, res) => {

    const { title, content } = req.body;
    const storyId = req.params.sid;
  
    let story;
    try {
      story = await Stories.findById(storyId);
    } catch (err) {
        return res.json("Something went wrong, could not update story " + err)
    }
    if(!story){
        return res.json("Story with the provided id was not found ")
    }
  
    //IDHER DECODED TOKEN SE DIRECT KRSKTE HO
    if (story.ERP.toString() !== req.userData.userERP) {
      return res.status(401).json({ error: "You are not allowed to edit this story." });
    }

  
    story.title = title;
    story.content = content;
  
    try {
      await story.save();
    } catch (err) {
        return  res.json("Something went wrong, could not update story " + err)  
    }
  
    return res.status(200).json({ story: story.toObject({ getters: true }) });

}

//DELETE
const deleteStories = async (req, res , next) => {
    const storyId = req.params.sid;


    let story;
    try {
      story = await Stories.findById(storyId);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong, Could not delete place" });

    }
  
                                //IDHER DECODED TOKEN SE DIRECT KRSKTE HO
    if (story.ERP.toString() !== req.userData.userERP) {
        return res.status(401).json({ error: "You are not allowed to delete this story." });
    }

    try {
        const deletedStory = await Stories.deleteOne({ _id: req.params.sid });
        return res.json(deletedStory);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
}

module.exports = {
    getAllStories,
    getStories,
    getStoryById,
    createStories,
    updateStories,
    deleteStories
}