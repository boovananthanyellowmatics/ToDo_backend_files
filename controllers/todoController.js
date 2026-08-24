const Todo = require("../models/Todo");


// ========================================
// GET ALL TODOS
// ========================================

const getTodos = async (req, res) => {

    try {

        const todos = await Todo.find()
            .sort({ createdAt: -1 });

        res.status(200).json(todos);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch todos",
            error: error.message
        });

    }
};


// ========================================
// CREATE TODO
// ========================================

const createTodo = async (req, res) => {

    try {

        const { text } = req.body;


        // Check text
        if (!text || text.trim() === "") {

            return res.status(400).json({
                message: "Todo text is required"
            });

        }


        const todo = await Todo.create({
            text: text.trim()
        });


        res.status(201).json(todo);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create todo",
            error: error.message
        });

    }
};


// ========================================
// UPDATE TODO
// ========================================

const updateTodo = async (req, res) => {

    try {

        const { id } = req.params;

        const { text, completed } = req.body;


        const todo = await Todo.findByIdAndUpdate(
            id,
            {
                text,
                completed
            },
            {
                new: true,
                runValidators: true
            }
        );


        if (!todo) {

            return res.status(404).json({
                message: "Todo not found"
            });

        }


        res.status(200).json(todo);

    } catch (error) {

        res.status(500).json({
            message: "Failed to update todo",
            error: error.message
        });

    }
};


// ========================================
// DELETE TODO
// ========================================

const deleteTodo = async (req, res) => {

    try {

        const { id } = req.params;


        const todo = await Todo.findByIdAndDelete(id);


        if (!todo) {

            return res.status(404).json({
                message: "Todo not found"
            });

        }


        res.status(200).json({
            message: "Todo deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete todo",
            error: error.message
        });

    }
};


module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};