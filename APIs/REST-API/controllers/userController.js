'use strict'

import argon2 from 'argon2'
import db from '../models/index.cjs'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import { registerSchema, updateSchema } from '../utils/userValidation.js'

const getAllUsers = catchAsync(async (req, res) => {
  const users = await db.User.findAll()

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  })
})

const createUser = catchAsync(async (req, res, next) => {
  if (!(await registerSchema.isValid(req.body)))
    return next(new AppError('User details not valid!', 400))

  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id })

  const user = await db.User.create({
    username: req.body.username.toLowerCase(),
    password: hash,
    email: req.body.email.toLowerCase(),
  })

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const getUser = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const getCurrentUser = catchAsync(async (req, res, next) => {
  // get user
  const user = await db.User.findByPk(req.user.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const updateUser = catchAsync(async (req, res, next) => {
  // get user
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  // filter req.body to eliminate attacks with more fields than allowed ones
  const filteredUpdate = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key]) => key === 'username' || key === 'email'
    )
  )

  // check if fields are valid
  if (
    !(await updateSchema.isValid(filteredUpdate)) ||
    Object.keys(filteredUpdate).length === 0
  )
    return next(new AppError('User details not valid!', 400))

  user.set({
    username: filteredUpdate?.username || user.username,
    email: filteredUpdate?.email.toLowerCase() || user.email,
  })

  const response = await user.save()

  res.status(200).json({
    status: 'success',
    data: {
      user: response,
    },
  })
})

const updateCurrentUser = catchAsync(async (req, res, next) => {
  // filter req.body to eliminate attacks with more fields than allowed ones
  const filteredUpdate = Object.fromEntries(
    Object.entries(req.body).filter(
      ([key]) => key === 'username' || key === 'email'
    )
  )

  // get user
  const user = await db.User.findByPk(req.user.id)

  // check if fields are valid
  if (
    !(await updateSchema.isValid(filteredUpdate)) ||
    Object.keys(filteredUpdate).length === 0
  )
    return next(new AppError('User details not valid!', 400))

  user.set({
    username: filteredUpdate?.username || user.username,
    email: filteredUpdate?.email.toLowerCase() || user.email,
  })

  const response = await user.save()

  res.status(200).json({
    status: 'success',
    data: {
      user: response,
    },
  })
})

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id)

  if (!user)
    return next(
      new AppError(`User with id: ${req.params.id} doesn't exist`, 404)
    )

  await user.destroy()

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

const deleteCurrentUser = catchAsync(async (req, res, next) => {
  // get user
  const user = await db.User.findByPk(req.user.id)

  if (!user) return next(new AppError(`User doesn't exist anymore`, 404))

  await user.destroy()

  res.status(204).json({
    status: 'success',
    data: null,
  })
})

export default {
  getAllUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateUser,
  updateCurrentUser,
  deleteUser,
  deleteCurrentUser,
}
