const router = require("express").Router();

const {
    addThought,
    removeThought,
    getAllThought,
    getThoughtById,
    addReaction,
    removeReaction,
} = require("../../controllers/thought-controller");


router
    .route("/")
    .get(getAllThought);

router
    .route("/:thoughtId")
    .get(getThoughtById);

router
    .route("/:userId")
    .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route("/:userId/thoughts/:thoughtId")
    .delete(removeThought);

router
    .route("/:userId/thoughts/:thoughtId")
    .put(addReaction)
    .delete(removeThought);

router
    .route('/:userId/thoughts/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
