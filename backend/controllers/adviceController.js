const Advice = require('../models/adviceModel')

//GET //for all alumni
const getAllAdvices = async (req, res, next) => {
  const PAGE_SIZE = 4;
  const page = parseInt(req.query.page) - 1 || 0;
  let sortField = req.query.sort;
  let category = req.query.category;
  let query = {};
  let currentPage = req.query.page || 1;

  if (category) {
    query.category = category;
  }

  let sortCriteria = {};
  //console.log("this is sortfiled = " + sortField)
  if (sortField === "date asc") {
    if (req.query.order === "asc") {
      sortCriteria.date = 1;
    } else {
      sortCriteria.date = -1;
    }
  }
  else if (sortField === "popularity") {
    sortCriteria.popularity = -1;
  }

  try {
    const total = await Advice.countDocuments(query);
    const advices = await Advice.find(query).sort(sortCriteria).limit(PAGE_SIZE).skip(PAGE_SIZE * page);
    res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage,
      advices,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


}

const getAdvices = async (req, res, next) => {
  const userERP = req.params.ERP;

  let advices;
  try {
    advices = await Advice.find({ ERP: userERP });
  } catch (err) {
    return res.status(500).json({ error: "Fetching advices failed, please try again later" });

  }

  if (!advices || advices.length === 0) {
    return res.status(404).json({ error: "Could not find advices for the provided user ERP." });

  }

  return res.json({
    advices: advices.map((advice) => advice.toObject({ getters: true })),
  });

}

const getAdviceById = async (req, res, next) => {
  const adviceId = req.params.aid;

  let advice;
  try {
    advice = await Advice.findById(adviceId);
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong, could not find advice" });
  }

  if (!advice) {
    return res.status(404).json({ error: "Could not find advice for the provided id" });
  }

  return res.json({ advice: advice.toObject({ getters: true }) });

}

//POST
const createAdvices = async (req, res, next) => {

  const advices = new Advice({
    ERP: req.userData.userERP,
    title: req.body.title,
    content: req.body.content,
    Name: req.userData.userName,
    category: req.body.category
  })

  try {
    await advices.save()

    res.json(advices);
  } catch (err) {
    return res.json("Failure to create advice: " + err)
  }

}

//PATCH
const updateAdvices = async (req, res) => {

  const { category, title, content } = req.body;
  const adviceId = req.params.aid;

  let advice;
  try {
    advice = await Advice.findById(adviceId);
  } catch (err) {
    return res.json("Something went wrong, could not update advice " + err)
  }
  if (!advice) {
    return res.json("Advice with the provided id was not found ")
  }

  //IDHER DECODED TOKEN SE DIRECT KRSKTE HO
  if (advice.ERP.toString() !== req.userData.userERP) {
    return res.status(401).json({ error: "You are not allowed to edit this advice." });
  }


  advice.title = title;
  advice.content = content;
  advice.category = category;

  try {
    await advice.save();
  } catch (err) {
    return res.json("Something went wrong, could not update advice " + err)
  }

  return res.status(200).json({ advice: advice.toObject({ getters: true }) });
}

//DELETE
const deleteAdvices = async (req, res, next) => {

  const adviceId = req.params.aid;


  let advice;
  try {
    advice = await Advice.findById(adviceId);
  } catch (err) {
    return res.json("Something went wrong, could not delete story " + err)

  }

  //IDHER DECODED TOKEN SE DIRECT KRSKTE HO
  if (story.ERP.toString() !== req.userData.userERP) {
    return res.status(401).json({ error: "You are not allowed to delete this advice." });
  }

  try {
    const deletedAdvice = await Advice.deleteOne({ _id: req.params.aid });
    res.json(deletedAdvice);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

}

module.exports = {
  getAllAdvices,
  getAdvices,
  getAdviceById,
  createAdvices,
  updateAdvices,
  deleteAdvices
}