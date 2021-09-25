const router = require("express").Router();

const {
    addThought,
    removeThought,
    getAllThought,
    getThoughtById,
    addReaction,
    removeReaction,
    updateThought,
} = require("../../controllers/thought-controller");


router
    .route("/")
    .get(getAllThought);

router
    .route("/:userId")
    .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route("/:thoughtId")
    .get(getThoughtById)    
    .put(updateThought)
    .delete(removeThought);


router
    .route("/:userId/:thoughtId")
    .post(addReaction);


router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
