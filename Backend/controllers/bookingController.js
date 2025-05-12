const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Hotel = require('../models/Hotel');
const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');
const Room = require('../models/Room');

exports.get =async(req,res)=>{
  try{
    const booking = await Booking.find();
    res.status(200).json(booking);
  }catch(error){
    res.status(500).json({message:'Error fetching bookings',error:error.message});
  }
}



exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      // .populate('item')
      // .populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user.id
    });

    // Update item availability if needed
    const Model = {
      trip: Trip,
      room: Room,
      car: Vehicle
    }[req.body.bookingType];

    if (req.body.bookingType === 'trip') {
      await Trip.findByIdAndUpdate(req.body.item, {
        $inc: { currentParticipants: 1 }
      });
    }
    //if booking type is room then change the availability of the room to false
    if(req.body.bookingType === 'room'){
      await Room.findByIdAndUpdate(req.body.item,{
        $set:{availability:false}
      })
      
    }
    




    // if(req.body.bookingType === 'room'){
    //   await Room.findByIdAndUpdate(req.body.item,{
    //     $inc:{availability:false}

    //   })
    // }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    if (booking.bookingType === 'trip') {
      await Trip.findByIdAndUpdate(booking.item, {
        $inc: { currentParticipants: -1 }
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};