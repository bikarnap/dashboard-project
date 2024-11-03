const poolsRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Pool = require('../models/pool');
const { Op } = require('sequelize');

poolsRouter.get('/', async (req, res) => {
    let selectAll;
    selectAll = await Pool.findAll();
    if (selectAll)
        res.json(selectAll);
    else
        res.send('not found')
});


poolsRouter.get('/:id', async (req, res) => {
    const poolId = (req.params.id);
    console.log(poolId)

    await Pool.findOne({
        where: {
            id: {
                [Op.eq]: poolId
            }
        }
    }).then(pool => {
        if (pool) res.json(pool)
        else res.json({error: 'no pool found'})
    });
});

poolsRouter.post('/', async (req, res) => {
    const body = req.body;

    const saltRounds = 10;
    const hasedPassword = await bcrypt.hash(body.password, saltRounds);

    const newPool = {
        poolName: body.poolName,
        poolMaster: body.poolMaster,
        masterIP: body.masterIP,
        username: body.username,
        password: hasedPassword
    };

    (async () => {
        await Pool.sync();
        let pool = await Pool.create(newPool);
        await pool.save();
        res.json(pool);
    })();

});

poolsRouter.put('/:id', async (req, res) => {
    const poolId = Number(req.params.id);
    const body = req.body;

    await Pool.update({ masterIP: body.masterIP }, {
        where: {
           id: {
               [Op.eq]: poolId
           }
        }
    })
    .then(async returnCode => {
        if (returnCode){
            const updatedPool = await Pool.findOne({
                where: {
                    id: {
                        [Op.eq]: poolId
                    }
                }
            })
            res.json(updatedPool);
        }
        else
            res.json({error: 'Could not update the pool'});
    })

});

module.exports = poolsRouter;
