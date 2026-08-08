import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Users, UserCheck, CalendarCheck, FileQuestion, FileSpreadsheet,
  Award, FolderOpen, CreditCard, BellRing, Settings, Upload, Plus, Search, CheckCircle2,
  AlertTriangle, ArrowUpRight, Sparkles, BookOpen, Clock, ShieldCheck, Download, Trash2,
  Mail, Lock, ArrowRight, LogOut, CheckCircle, Edit, X, Camera, UserPlus, Layers, QrCode,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://te-app-backend.vercel.app/api';

const REAL_BATCHES_PRESETS = [
  { name: 'Target JEE', tag: 'JEE • Class Dropper', timing: '07:00 AM - 01:30 PM', subjects: 'Physics, Chemistry and Mathematics' },
  { name: 'Target Neet', tag: 'NEET • Class Dropper', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry and Biology' },
  { name: 'FN-01', tag: 'NEET • Class 12th', timing: '01:30 PM - 07:00 PM', subjects: 'Physics, Chemistry & Biology' },
  { name: 'FJ-01', tag: 'JEE • Class 12th', timing: '01:30 PM - 07:00 PM', subjects: 'Physics, Chemistry & Mathematics' },
  { name: 'FN-01', tag: 'NEET • Class 11th', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry & Biology' },
  { name: 'FJ-01', tag: 'JEE • Class 11th', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry & Mathematics' }
];

const getInitials = (name) => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function App() {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('teamexcellentadmin@gmail.com');
  const [adminPassword, setAdminPassword] = useState('Teamexcellent@123');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };

  // Dashboard Tab & Data State
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);

  // Real Database Batches with individual timings and tags
  const [batches, setBatches] = useState([
    { _id: 'b1', name: 'Target JEE', tag: 'JEE • Class Dropper', timing: '07:00 AM - 01:30 PM', subjects: 'Physics, Chemistry and Mathematics' },
    { _id: 'b2', name: 'Target Neet', tag: 'NEET • Class Dropper', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry and Biology' },
    { _id: 'b3', name: 'FN-01', tag: 'NEET • Class 12th', timing: '01:30 PM - 07:00 PM', subjects: 'Physics, Chemistry & Biology' },
    { _id: 'b4', name: 'FJ-01', tag: 'JEE • Class 12th', timing: '01:30 PM - 07:00 PM', subjects: 'Physics, Chemistry & Mathematics' },
    { _id: 'b5', name: 'FN-01', tag: 'NEET • Class 11th', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry & Biology' },
    { _id: 'b6', name: 'FJ-01', tag: 'JEE • Class 11th', timing: '09:00 AM - 01:30 PM', subjects: 'Physics, Chemistry & Mathematics' }
  ]);

  // Form State for Adding Student
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNo: '',
    email: '',
    dob: '2006-05-15',
    mobile: '',
    parentPhone: '',
    fatherName: '',
    course: 'IIT-JEE Engineering',
    class: 'Class 12th Standard',
    batch: 'Target JEE',
    feeStatus: 'Fully Paid',
    address: '',
    avatar: ''
  });

  // Form State for Editing Student
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Attendance Calendar Modal State
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceStudent, setAttendanceStudent] = useState(null);
  const [dbAttendanceRecords, setDbAttendanceRecords] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Form State for Creating Batch
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: '2026 Alpha Batch',
    classLevel: 'Class 12th',
    targetCourse: 'IIT-JEE',
    primarySubjects: 'Physics & Mathematics',
    timing: '08:00 AM - 10:00 AM'
  });

  // Camera & File Upload Refs and State
  const addFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraTarget, setCameraTarget] = useState('add');
  const [mediaStream, setMediaStream] = useState(null);

  const [pdfUploading, setPdfUploading] = useState(false);
  const [extractedQuestions, setExtractedQuestions] = useState(null);

  // Test Engine & Results State
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [selectedTestFilter, setSelectedTestFilter] = useState('');
  const [newTest, setNewTest] = useState({
    title: '',
    subject: 'Physics',
    totalMarks: 120,
    durationMinutes: 180,
    date: new Date().toISOString().split('T')[0],
    batch: 'Target JEE'
  });
  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 'A',
    solutionText: '',
    subject: 'Physics',
    imageUrl: ''
  });

  const fetchTests = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/tests`);
      const data = await res.json();
      if (data.success && Array.isArray(data.tests)) {
        setTests(data.tests);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Tests connect fallback');
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/results`);
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setAllResults(data.results);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Results connect fallback');
    }
  };

  const fetchTestQuestions = async (testId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/tests/${testId}/questions`);
      const data = await res.json();
      if (data.success && Array.isArray(data.questions)) {
        setTestQuestions(data.questions);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Questions fetch fallback');
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTest)
      });
      const data = await res.json();
      if (data.success) {
        alert('Test created successfully!');
        setShowCreateTestModal(false);
        setNewTest({
          title: '',
          subject: 'Physics',
          totalMarks: 120,
          durationMinutes: 180,
          date: new Date().toISOString().split('T')[0],
          batch: 'Target JEE'
        });
        fetchTests();
      }
    } catch (err) {
      alert('Error creating test');
    }
  };

  const handleDeleteTest = async (testId) => {
    if (!window.confirm('Are you sure you want to delete this test and all its questions?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/tests/${testId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchTests();
        if (activeTest && activeTest._id === testId) {
          setActiveTest(null);
          setTestQuestions([]);
        }
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Delete test fallback');
    }
  };

  const handleLaunchTest = async (testId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/tests/${testId}/launch`, {
        method: 'PUT'
      });
      const data = await res.json();
      if (data.success) {
        alert('Test launched successfully! It is now live for all students in the batch.');
        fetchTests();
      } else {
        alert(data.message || 'Failed to launch test.');
      }
    } catch (err) {
      alert('Error launching test. Make sure the backend is running.');
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!activeTest) return;
    try {
      const res = await fetch(`${API_BASE}/admin/tests/${activeTest._id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      });
      const data = await res.json();
      if (data.success) {
        alert('Question added successfully!');
        setNewQuestion({
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: 'A',
          solutionText: '',
          subject: activeTest.subject || 'Physics',
          imageUrl: ''
        });
        fetchTestQuestions(activeTest._id);
      }
    } catch (err) {
      alert('Error adding question');
    }
  };

  const handleDeleteQuestion = async (qId) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/questions/${qId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchTestQuestions(activeTest._id);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Delete question fallback');
    }
  };

  const handleQuestionImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewQuestion(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch Attendance records marked by External Software directly from MongoDB Atlas
  const handleOpenAttendance = async (student) => {
    setAttendanceStudent(student);
    setShowAttendanceModal(true);
    setAttendanceLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/students/${student._id}/attendance`);
      const data = await res.json();
      if (data.success && Array.isArray(data.attendance)) {
        setDbAttendanceRecords(data.attendance);
      } else {
        setDbAttendanceRecords([]);
      }
    } catch (err) {
      console.warn('[Attendance DB] Fetch fallback');
      setDbAttendanceRecords([]);
    } finally {
      setAttendanceLoading(false);
    }
  };

  // Handle File Selection & Conversion to Base64 Preview
  const handleFileChange = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'add') {
          setNewStudent(prev => ({ ...prev, avatar: reader.result }));
        } else if (target === 'edit') {
          setEditingStudent(prev => ({ ...prev, avatar: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Webcam Stream for Live Photo Capture
  const handleStartCamera = async (target) => {
    setCameraTarget(target);
    setShowCameraModal(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Camera access denied or webcam not detected. Please ensure browser permissions are allowed.');
      setShowCameraModal(false);
    }
  };

  // Stop Webcam Stream
  const handleStopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setShowCameraModal(false);
  };

  // Snap Photo from Live Video Feed
  const handleSnapPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/jpeg');

      if (cameraTarget === 'add') {
        setNewStudent(prev => ({ ...prev, avatar: photoDataUrl }));
      } else if (cameraTarget === 'edit') {
        setEditingStudent(prev => ({ ...prev, avatar: photoDataUrl }));
      }

      handleStopCamera();
    }
  };

  // Fetch Real Students & Batches directly from MongoDB Atlas API
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/students`);
      const data = await res.json();
      if (data.success && Array.isArray(data.students)) {
        setStudents(data.students);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Backend connect fallback');
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/batches`);
      const data = await res.json();
      if (data.success && Array.isArray(data.batches) && data.batches.length > 0) {
        let fnCount = 0;
        let fjCount = 0;

        const mapped = data.batches.map(b => {
          const name = b.name || '';
          let preset = null;

          if (name === 'Target JEE') {
            preset = REAL_BATCHES_PRESETS[0];
          } else if (name === 'Target Neet') {
            preset = REAL_BATCHES_PRESETS[1];
          } else if (name === 'FN-01') {
            preset = fnCount === 0 ? REAL_BATCHES_PRESETS[2] : REAL_BATCHES_PRESETS[4];
            fnCount++;
          } else if (name === 'FJ-01') {
            preset = fjCount === 0 ? REAL_BATCHES_PRESETS[3] : REAL_BATCHES_PRESETS[5];
            fjCount++;
          } else {
            preset = { tag: b.tag || 'Active Batch', timing: b.timing || '08:00 AM - 10:00 AM', subjects: b.subjects || 'Physics, Chemistry & Mathematics' };
          }

          return {
            _id: b._id,
            name: b.name,
            tag: b.tag || preset.tag,
            timing: (b.timing && b.timing !== '08:00 AM - 01:30 PM') ? b.timing : preset.timing,
            subjects: b.subjects || preset.subjects
          };
        });

        setBatches(mapped);
      }
    } catch (err) {
      console.warn('[Admin Dashboard] Batches connect fallback');
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchStudents();
      fetchBatches();
      fetchTests();
      fetchResults();
    }
  }, [isAdminLoggedIn]);

  // Handle Admin Login Submission
  const handleAdminSignIn = (e) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      alert('Please enter Work Email Address and Password');
      return;
    }
    if (adminEmail.trim() !== 'teamexcellentadmin@gmail.com' || adminPassword.trim() !== 'Teamexcellent@123') {
      alert('Invalid admin credentials. Please enter correct email and password.');
      return;
    }
    setIsAdminLoggedIn(true);
  };

  // Create Batch and Add to Live List & DB
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    if (!newBatch.name.trim()) {
      alert('Please enter Batch Name / Label');
      return;
    }

    const tagText = `${newBatch.targetCourse} • ${newBatch.classLevel}`;
    const batchObj = {
      _id: Date.now().toString(),
      name: newBatch.name,
      tag: tagText,
      timing: newBatch.timing,
      subjects: newBatch.primarySubjects || 'Physics, Chemistry & Mathematics'
    };

    try {
      const res = await fetch(`${API_BASE}/admin/batches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBatch)
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || `Batch ${newBatch.name} created!`);
        setShowBatchModal(false);
        setBatches(prev => [data.batch || batchObj, ...prev]);
        setNewStudent(prev => ({ ...prev, batch: newBatch.name }));
      }
    } catch (err) {
      setBatches(prev => [batchObj, ...prev]);
      setNewStudent(prev => ({ ...prev, batch: newBatch.name }));
      setShowBatchModal(false);
      alert(`Batch "${newBatch.name}" created and added to Assign Batch dropdown!`);
    }
  };

  // Delete Batch
  const handleDeleteBatch = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete batch "${name}"?`)) {
      return;
    }

    try {
      await fetch(`${API_BASE}/admin/batches/${id}`, { method: 'DELETE' });
      setBatches(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      setBatches(prev => prev.filter(b => b._id !== id));
    }
  };

  // Add New Student with Complete Fields to MongoDB Atlas
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.rollNo) {
      alert('Please fill Student Full Name and Roll Number');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Student Enrolled Successfully!');
        setShowAddModal(false);
        fetchStudents();
      }
    } catch (err) {
      setStudents(prev => [{ _id: Date.now().toString(), ...newStudent }, ...prev]);
      setShowAddModal(false);
    }
  };

  // Open Edit Modal for a Student
  const handleOpenEdit = (student) => {
    setEditingStudent({
      _id: student._id,
      name: student.name || '',
      rollNo: student.rollNo || student.studentId || '',
      email: student.email || '',
      dob: student.dob || '2006-05-15',
      mobile: student.mobile || '',
      parentPhone: student.parentPhone || '',
      fatherName: student.fatherName || '',
      course: student.course || 'IIT-JEE Engineering',
      class: student.class || 'Class 12th Standard',
      batch: student.batch || 'Target JEE',
      feeStatus: student.feeStatus || 'Fully Paid',
      address: student.address || '',
      avatar: student.avatar || ''
    });
    setShowEditModal(true);
  };

  // Save Updated Student to MongoDB Atlas
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    if (!editingStudent || !editingStudent.name || !editingStudent.rollNo) {
      alert('Please fill Student Name and Roll Number');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent)
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Student updated successfully!');
        setShowEditModal(false);
        fetchStudents();
      }
    } catch (err) {
      setStudents(prev => prev.map(s => s._id === editingStudent._id ? editingStudent : s));
      setShowEditModal(false);
    }
  };

  // Delete Student from MongoDB Atlas
  const handleDeleteStudent = async (student) => {
    if (!window.confirm(`Are you sure you want to delete ${student.name} (${student.rollNo})? This student will no longer be able to log into the mobile app.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/students/${student._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Student deleted successfully!');
        fetchStudents();
      }
    } catch (err) {
      setStudents(prev => prev.filter(s => s._id !== student._id));
    }
  };

  // Handle PDF Upload for Question Auto-Extraction
  const handlePdfUpload = async (e) => {
    e.preventDefault();
    setPdfUploading(true);
    setTimeout(() => {
      setPdfUploading(false);
      setExtractedQuestions([
        { id: 'ext_1', questionText: 'What is the SI unit of Electric Current?', options: ['Volt', 'Ampere', 'Ohm', 'Joule'], correct: 'Ampere (B)', explanation: 'SI unit of current is Ampere (A).' },
        { id: 'ext_2', questionText: 'The work done in moving a unit positive charge across two points in a circuit is called:', options: ['Potential Difference', 'Resistance', 'Power', 'Energy'], correct: 'Potential Difference (A)', explanation: 'Potential difference is work per unit charge.' },
        { id: 'ext_3', questionText: 'Which wave has the highest frequency in the EM spectrum?', options: ['Radio waves', 'Infrared rays', 'Gamma rays', 'Ultraviolet rays'], correct: 'Gamma rays (C)', explanation: 'Gamma rays have highest frequency and shortest wavelength.' }
      ]);
    }, 1200);
  };

  // ==========================================================
  // 1. ADMIN SIGN IN SCREEN
  // ==========================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F6F4FA] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl bg-white rounded-3xl border border-purple-100/80 shadow-2xl shadow-purple-900/10 overflow-hidden flex flex-col md:flex-row relative z-10">
          <div className="w-full md:w-1/2 bg-gradient-to-b from-[#FAF8FC] to-[#F3EEF9] p-10 flex flex-col justify-between border-r border-purple-100/60">
            <div className="flex items-center gap-2">
              <span className="bg-[#552479]/10 text-[#552479] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Official Staff Portal
              </span>
            </div>

            <div className="my-auto py-8 text-center space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 flex justify-center items-center">
                <img
                  src="/Team-excellentlogo.svg"
                  alt="Team Excellent Official Logo"
                  className="w-full max-w-sm h-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-white/80 p-3 rounded-xl border border-purple-100/50 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-800">Attendance Sync</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-purple-100/50 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-800">PDF Question Bank</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-purple-100/50 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-800">MongoDB Atlas DB</span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-purple-100/50 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-xs font-bold text-gray-800">Live Student App</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 font-medium border-t border-purple-100 pt-4 flex justify-between">
              <span>© 2026 Team Excellent</span>
              <span>Webflora Technologies</span>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-10 flex flex-col justify-between bg-white">
            <div className="space-y-6 my-auto">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Staff Sign In</h2>
                <p className="text-xs text-gray-500 font-semibold mt-1">
                  Enter your credentials to access the Director & Faculty Dashboard.
                </p>
              </div>

              <form onSubmit={handleAdminSignIn} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-extrabold text-gray-600 uppercase tracking-wider mb-1.5">
                    WORK EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="name@institute.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#552479] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-gray-600 uppercase tracking-wider mb-1.5">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#552479] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#552479] text-white py-3.5 rounded-xl text-xs font-extrabold hover:bg-[#431b60] transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                >
                  <span>Continue to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-3">
                <button
                  onClick={() => { setAdminEmail('superadmin@coaching.com'); setAdminPassword('password123'); }}
                  className="w-full p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 hover:border-[#552479] flex items-center justify-between text-left group transition-all"
                >
                  <div>
                    <span className="block text-[10px] font-extrabold uppercase text-[#552479] tracking-wider">
                      SUPER ADMIN DEMO CREDENTIALS
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      superadmin@coaching.com
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#552479] bg-white px-2.5 py-1 rounded-lg shadow-sm border border-purple-100">
                    1-Click Auto Fill →
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center text-[11px] text-gray-400 font-semibold pt-4">
              Developed by <strong className="text-gray-900 font-bold">Webflora Technologies</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD PORTAL
  // ==========================================================
  return (
    <div className="flex h-screen bg-[#F8F9FC] text-[#111827] overflow-hidden font-sans">
      {/* Hidden File Input Elements for Photo Selection */}
      <input
        type="file"
        ref={addFileInputRef}
        onChange={(e) => handleFileChange(e, 'add')}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={editFileInputRef}
        onChange={(e) => handleFileChange(e, 'edit')}
        accept="image/*"
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shadow-sm z-20 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-purple-200/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-300/50">
        <div>
          <div className="px-2 py-3 mb-6 border-b border-gray-100 flex flex-col items-center gap-1.5 bg-gradient-to-b from-purple-50/10 to-transparent rounded-2xl">
            <div className="bg-white px-3.5 py-2.5 rounded-2xl shadow-sm border border-gray-200/80 w-full flex items-center justify-center">
              <img src="/Team-excellentlogo.svg" alt="Team Excellent Logo" className="h-10 w-auto object-contain" />
            </div>
            <span className="text-[10px] font-black tracking-widest text-[#552479]/80 uppercase mt-1">Admin Portal v1.0</span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'students', label: 'Students Directory', icon: Users, highlight: true },
              { id: 'faculty', label: 'Faculty Management', icon: UserCheck },
              { id: 'attendance', label: 'Attendance Tracker', icon: CalendarCheck },
              { id: 'batches', label: 'Batch & Class', icon: Layers },
              { id: 'question-bank', label: 'Question Bank (PDF OCR)', icon: FileQuestion },
              { id: 'online-tests', label: 'Online Test Engine', icon: FileSpreadsheet },
              { id: 'results', label: 'Results & AIR Rankings', icon: Award },
              { id: 'materials', label: 'Study Material Hub', icon: FolderOpen },
              { id: 'payments', label: 'Payments & Fee Log', icon: CreditCard },
              { id: 'announcements', label: 'Push & Announcements', icon: BellRing },
              { id: 'settings', label: 'System Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#552479] text-white shadow-md shadow-purple-200'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-[#552479]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-2 space-y-2">
          {showInstallBtn && (
            <button
              onClick={handleInstallApp}
              className="w-full p-3 rounded-xl bg-[#552479]/10 text-[#552479] text-xs font-black flex items-center justify-center gap-2 hover:bg-[#552479]/20 border border-[#552479]/20 transition-all uppercase tracking-widest"
            >
              <Download className="w-4 h-4" /> Install TE App
            </button>
          )}
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="w-full p-3 rounded-xl bg-rose-50 text-rose-600 text-xs font-black flex items-center justify-center gap-2 hover:bg-rose-100 transition-all uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/80">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {activeTab === 'dashboard' && 'Director Dashboard Overview'}
              {activeTab === 'students' && 'Student Management & Enrollment'}
              {activeTab === 'batches' && 'Batch & Class Management'}
              {activeTab === 'question-bank' && 'Question Bank - Auto PDF Extractor'}
              {activeTab === 'online-tests' && 'CBT Online Test Engine'}
              {activeTab === 'results' && 'Test Results & AIR Rankings'}
              {activeTab === 'faculty' && 'Faculty Directory'}
              {['attendance', 'materials', 'payments', 'announcements', 'settings'].includes(activeTab) && `${activeTab.toUpperCase()} Management`}
            </h1>
            <p className="text-xs text-gray-500 font-semibold mt-1">Managing MongoDB Atlas: te-attendance database</p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'online-tests' ? (
              <button
                onClick={() => setShowCreateTestModal(true)}
                className="bg-[#552479] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-purple-200 hover:bg-[#431b60] flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> + Create CBT Online Test
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="bg-white border border-[#552479] text-[#552479] px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-purple-50 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" /> + Create Coaching Batch
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#552479] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-purple-200 hover:bg-[#431b60] flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Enroll New Student
                </button>
              </>
            )}
          </div>
        </header>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Enrolled Students</span>
                <div className="text-2xl font-black text-gray-900 mt-1">{students.length} Total</div>
                <span className="text-[11px] font-bold text-emerald-600">Synced with Mobile App</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-xs font-semibold text-gray-500">Active Coaching Batches</span>
                <div className="text-2xl font-black text-gray-900 mt-1">{batches.length} Active</div>
                <span className="text-[11px] font-bold text-purple-600">Assign in Enrollment</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#552479] to-[#7932aa] text-white flex items-center justify-between shadow-lg">
              <div>
                <span className="bg-white/20 text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  Connected DB: te-attendance
                </span>
                <h3 className="text-xl font-extrabold mt-1">Centralized Institute Control</h3>
                <p className="text-xs text-white/90 mt-1">Create Batches & Enroll Students. Enrolled students immediately log into Mobile App.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setActiveTab('batches')} className="bg-white/20 text-white border border-white/40 px-4 py-2.5 rounded-xl text-xs font-bold">
                  View Batches →
                </button>
                <button onClick={() => setActiveTab('students')} className="bg-white text-[#552479] px-4 py-2.5 rounded-xl text-xs font-bold shadow-md">
                  Manage Students →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REAL STUDENT MANAGEMENT (DIRECT RAW DB ST.BATCH DISPLAY) */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-gray-900">Enrolled Student Registry ({students.length})</h3>
                <p className="text-xs text-gray-500">Real student documents fetched live from MongoDB Atlas database.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="bg-purple-50 text-[#552479] px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-purple-100 flex items-center gap-1.5 border border-purple-200"
                >
                  <Layers className="w-3.5 h-3.5" /> + Batch
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#552479] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#431b60] flex items-center gap-1.5 shadow"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Enroll Student
                </button>
              </div>
            </div>

            {students.length === 0 ? (
              <div className="p-10 text-center text-gray-400 space-y-3">
                <Users className="w-10 h-10 mx-auto text-gray-300" />
                <p className="text-sm font-bold text-gray-600">No students enrolled yet in MongoDB Atlas database.</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#552479] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#431b60] shadow inline-flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Enroll First Student
                </button>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Student ID</th>
                    <th className="p-4">Roll No</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4">Father Name</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">DOB</th>
                    <th className="p-4">Assigned Batch</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {students.map((st) => (
                    <tr key={st._id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="p-4 font-bold text-[#552479] text-xs">{st.studentId || '—'}</td>
                      <td className="p-4 font-semibold text-gray-700 text-xs">{st.rollNo || '—'}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          {st.avatar && !st.avatar.includes('unsplash.com') ? (
                             <img src={st.avatar} className="w-8 h-8 rounded-full object-cover border border-purple-200" />
                           ) : (
                             <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-[#552479] font-black text-xs shrink-0">
                               {getInitials(st.name)}
                             </div>
                           )}
                          <span className="font-extrabold text-gray-900">{st.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-gray-700">{st.fatherName || '—'}</td>
                      <td className="p-4 font-semibold text-gray-700">{st.mobile || st.phoneNumber || '—'}</td>
                      <td className="p-4 text-gray-600 font-semibold">{st.dob || '—'}</td>
                      <td className="p-4">
                        <span className="bg-purple-50 text-[#552479] px-2.5 py-1 rounded-lg font-bold border border-purple-100">
                          {st.batch || '—'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* ATTENDANCE CALENDAR BUTTON */}
                          <button
                            onClick={() => handleOpenAttendance(st)}
                            className="p-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-bold flex items-center gap-1 transition-all"
                            title="View Attendance Marked from External Software"
                          >
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>Attendance</span>
                          </button>

                          <button
                            onClick={() => handleOpenEdit(st)}
                            className="p-1.5 bg-purple-50 text-[#552479] hover:bg-purple-100 rounded-lg font-bold flex items-center gap-1 transition-all"
                            title="Edit Student Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(st)}
                            className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-bold flex items-center gap-1 transition-all"
                            title="Delete Student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 3: BATCH & CLASS MANAGEMENT */}
        {activeTab === 'batches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <div>
                <h3 className="font-extrabold text-xl text-gray-900">Batch & Class Management</h3>
                <p className="text-xs text-gray-500 font-medium">Create batches and map schedules to student classes.</p>
              </div>

              <button
                onClick={() => setShowBatchModal(true)}
                className="bg-[#552479] text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-[#431b60] flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add New Batch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {batches.map((batch) => (
                <div key={batch._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-gray-900">{batch.name}</h4>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        {batch.tag}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        <span className="font-bold text-gray-800">{batch.timing}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600 mt-0.5" />
                        <span>Subject: <strong className="text-gray-900 font-bold">{batch.subjects}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-end gap-3 text-gray-400">
                    <button onClick={() => setShowBatchModal(true)} className="hover:text-[#552479] transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteBatch(batch._id, batch.name)} className="hover:text-rose-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUESTION BANK & AUTOMATED PDF EXTRACTION */}
        {activeTab === 'question-bank' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#552479]" /> PDF Question Bank Auto-Extraction Engine
              </h3>
              <p className="text-xs text-gray-500 mt-1">Upload Question PDF. System automatically extracts Question text, Options A-D, Answer, and Solution.</p>
              
              <form onSubmit={handlePdfUpload} className="mt-4 border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-purple-50/50">
                <Upload className="w-10 h-10 text-[#552479] mx-auto mb-2" />
                <h4 className="font-bold text-sm text-gray-900">Upload Question Paper PDF</h4>
                <button type="submit" className="mt-3 bg-[#552479] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow">
                  {pdfUploading ? 'Extracting via AI...' : 'Upload PDF Document'}
                </button>
              </form>
            </div>

            {extractedQuestions && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <h4 className="font-extrabold text-base text-gray-900">Extracted Questions ({extractedQuestions.length})</h4>
                {extractedQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-[#552479]">Q{idx + 1}: {q.questionText}</span>
                    <p className="text-emerald-700 font-bold">Answer: {q.correct}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: ONLINE TEST ENGINE */}
        {activeTab === 'online-tests' && (
          <div className="space-y-6">
            {!activeTest ? (
              // Test List View
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-base text-gray-900">Active Test Catalog ({tests.length})</h3>
                    <p className="text-xs text-gray-500">Manage online tests and add questions with diagram photos.</p>
                  </div>
                </div>

                {tests.length === 0 ? (
                  <div className="p-12 text-center text-gray-400 space-y-3">
                    <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="text-sm font-bold text-gray-600">No online tests created yet.</p>
                    <button
                      onClick={() => setShowCreateTestModal(true)}
                      className="bg-[#552479] text-white px-4 py-2 rounded-xl text-xs font-bold shadow hover:bg-[#431b60]"
                    >
                      + Create Your First Test
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {tests.map((test) => (
                      <div key={test._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-[#552479] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                              {test.subject}
                            </span>
                            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                              {test.batch}
                            </span>
                          </div>
                          <h4 className="text-base font-black text-gray-900 mt-3">{test.title}</h4>
                          <div className="mt-3 space-y-1.5 text-xs font-semibold text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-purple-600" />
                              <span>{test.durationMinutes} Minutes</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-purple-600" />
                              <span>{test.totalMarks} Max Marks</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                              <span>Date: {test.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                          {/* DYNAMIC ACTION BUTTON */}
                          {(!test.questionCount || test.questionCount === 0) ? (
                            <button
                              onClick={() => {
                                setActiveTest(test);
                                fetchTestQuestions(test._id);
                              }}
                              className="bg-purple-50 text-[#552479] hover:bg-[#552479] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                              Manage Questions →
                            </button>
                          ) : !test.isLaunched ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleLaunchTest(test._id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                              >
                                Launch Exam →
                              </button>
                              <button
                                onClick={() => {
                                  setActiveTest(test);
                                  fetchTestQuestions(test._id);
                                }}
                                className="bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-[#552479] px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all"
                                title="Edit Questions"
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedTestFilter(test.title);
                                  fetchResults();
                                  setActiveTab('results');
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                              >
                                Show Results →
                              </button>
                              <button
                                onClick={() => {
                                  setActiveTest(test);
                                  fetchTestQuestions(test._id);
                                }}
                                className="bg-purple-50 text-[#552479] hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-purple-200"
                                title="Manage/View Questions"
                              >
                                Manage Questions
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => handleDeleteTest(test._id)}
                            className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Question Manager View
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTest(null);
                        setTestQuestions([]);
                        fetchTests();
                      }}
                      className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold text-xs"
                    >
                      ← Back to Tests
                    </button>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase bg-purple-50 text-[#552479] px-2.5 py-0.5 rounded-md">
                        {activeTest.subject} • {activeTest.batch}
                      </span>
                      <h3 className="font-extrabold text-base text-gray-900 mt-0.5">{activeTest.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {testQuestions.length > 0 && (
                      <a
                        href={`http://localhost:3000/test/${activeTest._id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                      >
                        <Sparkles className="w-4 h-4" /> Launch CBT Exam →
                      </a>
                    )}
                    <div className="text-right text-xs text-gray-500 font-semibold">
                      <div>Questions Added: <strong className="text-gray-900">{testQuestions.length}</strong></div>
                      <div>Duration: {activeTest.durationMinutes} mins</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-gray-800">
                  {/* Left: Add Question Form */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 h-fit">
                    <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                      Add Question to Exam
                    </h4>
                    <form onSubmit={handleAddQuestion} className="space-y-4 text-xs font-semibold text-gray-700">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Question Text</label>
                        <textarea
                          rows={3}
                          required
                          value={newQuestion.questionText}
                          onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
                          placeholder="e.g. A particle of mass m is moving in a circular path..."
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#552479] font-medium"
                        />
                      </div>

                      {/* Question Diagram Image Upload */}
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Question Diagram (Optional Photo)</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQuestionImageUpload}
                            className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-50 file:text-[#552479] hover:file:bg-purple-100 cursor-pointer"
                          />
                          {newQuestion.imageUrl && (
                            <button
                              type="button"
                              onClick={() => setNewQuestion(prev => ({ ...prev, imageUrl: '' }))}
                              className="text-rose-500 text-xs hover:underline"
                            >
                              Clear Image
                            </button>
                          )}
                        </div>
                        {newQuestion.imageUrl && (
                          <div className="mt-2 border border-purple-100 rounded-xl p-2 bg-purple-50/20 max-w-full flex justify-center">
                            <img src={newQuestion.imageUrl} alt="Diagram preview" className="max-h-32 object-contain" />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Subject Area</label>
                          <select
                            value={newQuestion.subject}
                            onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#552479]"
                          >
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Biology">Biology</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">Correct Answer Option</label>
                          <select
                            value={newQuestion.correctAnswer}
                            onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#552479] font-bold text-[#552479]"
                          >
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-bold text-gray-700 mb-1">Answer Options (A-D)</label>
                        {['A', 'B', 'C', 'D'].map((opt, oIdx) => (
                          <div key={opt} className="flex items-center gap-2">
                            <span className="font-extrabold text-[#552479] w-4">{opt}:</span>
                            <input
                              type="text"
                              required
                              value={newQuestion.options[oIdx]}
                              onChange={(e) => {
                                const newOpts = [...newQuestion.options];
                                newOpts[oIdx] = e.target.value;
                                setNewQuestion({ ...newQuestion, options: newOpts });
                              }}
                              placeholder={`Option ${opt} Text`}
                              className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#552479]"
                            />
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Explanation / Solution Text (Optional)</label>
                        <textarea
                          rows={2}
                          value={newQuestion.solutionText}
                          onChange={(e) => setNewQuestion({ ...newQuestion, solutionText: e.target.value })}
                          placeholder="Why this answer is correct..."
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#552479] font-medium"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#552479] text-white py-3 rounded-xl hover:bg-[#431b60] font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Save Question
                      </button>
                    </form>
                  </div>

                  {/* Right: Question List */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                      Questions Catalog ({testQuestions.length})
                    </h4>

                    {testQuestions.length === 0 ? (
                      <div className="p-12 text-center text-gray-400 space-y-2">
                        <FileQuestion className="w-10 h-10 mx-auto text-gray-300" />
                        <p className="text-xs font-bold text-gray-600">No questions added yet. Use the form on the left to add one.</p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {testQuestions.map((q, idx) => (
                          <div key={q._id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3 relative">
                            <button
                              onClick={() => handleDeleteQuestion(q._id)}
                              className="absolute top-4 right-4 text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex items-center gap-2">
                              <span className="bg-[#552479] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                                Q {idx + 1}
                              </span>
                              <span className="text-[10px] bg-purple-100 text-[#552479] px-2 py-0.5 rounded-md font-bold">
                                {q.subject}
                              </span>
                            </div>

                            <p className="text-xs font-bold text-gray-950 pr-8">{q.questionText}</p>

                            {q.imageUrl && (
                              <div className="border border-gray-200 rounded-xl p-2 bg-white max-w-xs">
                                <img src={q.imageUrl} alt="Diagram" className="max-h-28 object-contain" />
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {['A', 'B', 'C', 'D'].map((opt, oIdx) => {
                                const isCorrect = q.correctAnswer === opt;
                                return (
                                  <div
                                    key={opt}
                                    className={`p-2 rounded-lg border font-semibold ${
                                      isCorrect
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-extrabold'
                                        : 'bg-white text-gray-600 border-gray-200'
                                    }`}
                                  >
                                    <span className="mr-1 text-purple-700 font-black">{opt}:</span> {q.options[oIdx]}
                                    {isCorrect && ' ✓'}
                                  </div>
                                );
                              })}
                            </div>

                            {q.solutionText && (
                              <div className="text-[11px] bg-purple-50/50 p-2.5 rounded-xl text-gray-600 font-semibold border border-purple-100/50">
                                <span className="font-extrabold text-[#552479] block">Explanation:</span>
                                {q.solutionText}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: TEST RESULTS & LEADERBOARD */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">Student CBT Attempt Results</h3>
                <p className="text-xs text-gray-500">Real-time performance scores, marks, and statistics logged from CBT Portal.</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide shrink-0">FILTER EXAM:</label>
                <select
                  value={selectedTestFilter}
                  onChange={(e) => setSelectedTestFilter(e.target.value)}
                  className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#552479] text-xs font-bold text-gray-700"
                >
                  <option value="">All Examinations</option>
                  {tests.map(t => (
                    <option key={t._id} value={t.title}>{t.title}</option>
                  ))}
                </select>
                <button
                  onClick={fetchResults}
                  className="bg-purple-50 hover:bg-purple-100 text-[#552479] px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all border border-purple-200"
                >
                  Refresh Data
                </button>
              </div>
            </div>

            {allResults.length === 0 ? (
              <div className="p-12 text-center text-gray-400 space-y-2">
                <Award className="w-12 h-12 mx-auto text-gray-300" />
                <p className="text-sm font-bold text-gray-600">No test results submitted yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Roll Number</th>
                      <th className="p-4">Exam Paper</th>
                      <th className="p-4">Marks Obtained</th>
                      <th className="p-4">Percentage</th>
                      <th className="p-4">Accuracy</th>
                      <th className="p-4">Rank / Percentile</th>
                      <th className="p-4">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700 text-xs">
                    {allResults.filter(res => !selectedTestFilter || res.testTitle === selectedTestFilter).map((res) => (
                      <tr key={res._id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="p-4 font-black text-gray-900">{res.studentName || 'Guest Candidate'}</td>
                        <td className="p-4 text-purple-700 font-extrabold">{res.studentRollNo || '—'}</td>
                        <td className="p-4 text-gray-950 font-bold">{res.testTitle}</td>
                        <td className="p-4 font-bold text-gray-900">
                          <span className="text-[#552479] font-black">{res.marksObtained}</span> / {res.totalMarks}
                        </td>
                        <td className="p-4 font-bold text-gray-800">{res.percentage}%</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            res.accuracyPercentage >= 80
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : res.accuracyPercentage >= 50
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {res.accuracyPercentage}%
                          </span>
                        </td>
                        <td className="p-4 font-bold text-gray-800">
                          <div>Rank: #{res.rank || res.airRank || 1}</div>
                          <div className="text-[10px] text-gray-400 font-bold">{res.percentile || 99}%tile</div>
                        </td>
                        <td className="p-4 font-bold text-gray-500">{res.timeAnalysisMinutes || 10} mins</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MODAL: CREATE CBT ONLINE TEST */}
        {showCreateTestModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#151928] text-white rounded-3xl p-7 max-w-lg w-full space-y-5 shadow-2xl border border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="font-extrabold text-xl text-white">Create CBT Online Test</h3>
                <button onClick={() => setShowCreateTestModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateTest} className="space-y-4 text-xs font-semibold text-gray-300">
                <div>
                  <label className="block text-gray-300 mb-1.5">Test Title</label>
                  <input
                    type="text"
                    required
                    value={newTest.title}
                    onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                    placeholder="e.g. JEE Advanced Mock Test #12"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1.5">Subject Type</label>
                    <select
                      value={newTest.subject}
                      onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4] font-bold text-gray-300"
                    >
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="PCM Mock (Full Syllabus)">PCM Mock (Full Syllabus)</option>
                      <option value="PCB Mock (Full Syllabus)">PCB Mock (Full Syllabus)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1.5">Date of Exam</label>
                    <input
                      type="date"
                      required
                      value={newTest.date}
                      onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1.5">Duration (Minutes)</label>
                    <input
                      type="number"
                      required
                      value={newTest.durationMinutes}
                      onChange={(e) => setNewTest({ ...newTest, durationMinutes: parseInt(e.target.value) || 180 })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1.5">Total Marks</label>
                    <input
                      type="number"
                      required
                      value={newTest.totalMarks}
                      onChange={(e) => setNewTest({ ...newTest, totalMarks: parseInt(e.target.value) || 120 })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5">Target Coaching Batch</label>
                  <select
                    value={newTest.batch}
                    onChange={(e) => setNewTest({ ...newTest, batch: e.target.value })}
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#7B3FE4] font-bold text-gray-300"
                  >
                    <option value="All Batches">All Batches</option>
                    {batches.map(b => (
                      <option key={b._id} value={b.name}>{b.name} ({b.tag})</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateTestModal(false)}
                    className="flex-1 p-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-[#7B3FE4] text-white rounded-xl font-bold shadow-lg hover:bg-[#682FD1]"
                  >
                    Create & Save Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 1: CREATE COACHING BATCH MODAL */}
        {showBatchModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#151928] text-white rounded-3xl p-7 max-w-lg w-full space-y-5 shadow-2xl border border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="font-extrabold text-xl text-white">Create Coaching Batch</h3>
                <button onClick={() => setShowBatchModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateBatch} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Batch Name / Label</label>
                  <input
                    type="text"
                    required
                    value={newBatch.name}
                    onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                    placeholder="e.g. 2026 Alpha Batch"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Class Level</label>
                    <select
                      value={newBatch.classLevel}
                      onChange={(e) => setNewBatch({ ...newBatch, classLevel: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="Class 12th">Class 12th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 10th">Class 10th</option>
                      <option value="Class Dropper">Class Dropper</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Target Course</label>
                    <select
                      value={newBatch.targetCourse}
                      onChange={(e) => setNewBatch({ ...newBatch, targetCourse: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="IIT-JEE">IIT-JEE</option>
                      <option value="NEET">NEET</option>
                      <option value="Foundations">Foundations</option>
                      <option value="CUET">CUET</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Primary Subject(s)</label>
                  <input
                    type="text"
                    value={newBatch.primarySubjects}
                    onChange={(e) => setNewBatch({ ...newBatch, primarySubjects: e.target.value })}
                    placeholder="e.g. Physics, Chemistry and Mathematics"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Batch Timings</label>
                  <input
                    type="text"
                    required
                    value={newBatch.timing}
                    onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })}
                    placeholder="08:00 AM - 10:00 AM"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowBatchModal(false)}
                    className="flex-1 p-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-[#7B3FE4] text-white rounded-xl font-bold shadow-lg hover:bg-[#682FD1]"
                  >
                    Save Batch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ENROLL NEW STUDENT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111625] text-white rounded-3xl p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#7B3FE4]" />
                  <h3 className="font-extrabold text-xl text-white">Enroll New Student</h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Student Photo Upload & Live Camera Box */}
              <div className="bg-[#192033] p-5 rounded-2xl border border-gray-800 flex items-center gap-5">
                <img
                  src={newStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                  alt="Student Photo Preview"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shrink-0"
                />
                <div className="space-y-2">
                  <h4 className="font-extrabold text-sm text-white">Student Photo</h4>
                  <p className="text-[11px] text-gray-400">Supported formats: JPG, PNG. Click below to select file or capture live.</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => addFileInputRef.current && addFileInputRef.current.click()}
                      className="px-3.5 py-1.5 bg-[#232C47] hover:bg-[#7B3FE4] text-xs font-bold rounded-xl text-white border border-gray-700 flex items-center gap-1.5 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" /> Choose File
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartCamera('add')}
                      className="px-3.5 py-1.5 bg-[#232C47] hover:bg-[#7B3FE4] text-xs font-bold rounded-xl text-white border border-gray-700 flex items-center gap-1.5 transition-all"
                    >
                      <Camera className="w-3.5 h-3.5" /> Capture Live
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      placeholder="Aarav Sharma"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={newStudent.rollNo}
                      onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                      placeholder="JEE-12-001"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Date of Birth (DOB)</label>
                    <input
                      type="date"
                      required
                      value={newStudent.dob}
                      onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Student Phone Number</label>
                    <input
                      type="text"
                      required
                      value={newStudent.mobile}
                      onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                      placeholder="+919876543210"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Parent Phone Number (Optional)</label>
                    <input
                      type="text"
                      value={newStudent.parentPhone}
                      onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                      placeholder="+919876543219"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Father's Name (Optional)</label>
                    <input
                      type="text"
                      value={newStudent.fatherName}
                      onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                      placeholder="Rajesh Sharma"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Student Email Address (Optional)</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      placeholder="aarav@teamexcellent.edu"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Fee Status</label>
                    <select
                      value={newStudent.feeStatus}
                      onChange={(e) => setNewStudent({ ...newStudent, feeStatus: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="Fully Paid">Fully Paid</option>
                      <option value="Paid Installment #1">Paid Installment #1</option>
                      <option value="Paid Installment #2">Paid Installment #2</option>
                      <option value="Pending ₹40k">Pending ₹40k</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Target Course</label>
                    <select
                      value={newStudent.course}
                      onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="IIT-JEE Engineering">IIT-JEE Engineering</option>
                      <option value="NEET Premier 2026">NEET Premier 2026</option>
                      <option value="Foundation 10th">Foundation 10th</option>
                      <option value="CUET 2026">CUET 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Academic Class</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="Class 12th Standard">Class 12th Standard</option>
                      <option value="Class 11th Standard">Class 11th Standard</option>
                      <option value="12th Pass / Dropper">12th Pass / Dropper</option>
                      <option value="Class 10th Foundation">Class 10th Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Assign Coaching Batch</label>
                  <select
                    value={newStudent.batch}
                    onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  >
                    {batches.map((b) => (
                      <option key={b._id} value={b.name}>
                        {b.name} - {b.tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Residential Address</label>
                  <textarea
                    rows={2}
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    placeholder="Salt Lake Sector 3, Kolkata"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 p-3 border border-gray-700 rounded-xl font-bold text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-[#7B3FE4] text-white rounded-xl font-bold shadow-lg hover:bg-[#682FD1]"
                  >
                    Save & Enroll Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: EDIT STUDENT MODAL */}
        {showEditModal && editingStudent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111625] text-white rounded-3xl p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-gray-800">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#7B3FE4]" />
                  <h3 className="font-extrabold text-xl text-white">Edit Student Details ({editingStudent.rollNo})</h3>
                </div>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Student Photo Upload & Live Camera Box */}
              <div className="bg-[#192033] p-5 rounded-2xl border border-gray-800 flex items-center gap-5">
                <img
                  src={editingStudent.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                  alt="Student Avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shrink-0"
                />
                <div className="space-y-2">
                  <h4 className="font-extrabold text-sm text-white">Student Photo</h4>
                  <p className="text-[11px] text-gray-400">Supported formats: JPG, PNG. Click below to select file or capture live.</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current && editFileInputRef.current.click()}
                      className="px-3.5 py-1.5 bg-[#232C47] hover:bg-[#7B3FE4] text-xs font-bold rounded-xl text-white border border-gray-700 flex items-center gap-1.5 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" /> Choose File
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartCamera('edit')}
                      className="px-3.5 py-1.5 bg-[#232C47] hover:bg-[#7B3FE4] text-xs font-bold rounded-xl text-white border border-gray-700 flex items-center gap-1.5 transition-all"
                    >
                      <Camera className="w-3.5 h-3.5" /> Capture Live
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleUpdateStudent} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Roll Number</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.rollNo}
                      onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                      placeholder="Roll Number"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Date of Birth (DOB)</label>
                    <input
                      type="date"
                      required
                      value={editingStudent.dob || '2006-05-15'}
                      onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Student Phone Number</label>
                    <input
                      type="text"
                      required
                      value={editingStudent.mobile}
                      onChange={(e) => setEditingStudent({ ...editingStudent, mobile: e.target.value })}
                      placeholder="+919876543210"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Parent Phone Number (Optional)</label>
                    <input
                      type="text"
                      value={editingStudent.parentPhone}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                      placeholder="+919876543219"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Father's Name (Optional)</label>
                    <input
                      type="text"
                      value={editingStudent.fatherName}
                      onChange={(e) => setEditingStudent({ ...editingStudent, fatherName: e.target.value })}
                      placeholder="Father's Name"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Student Email Address (Optional)</label>
                    <input
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      placeholder="aarav@teamexcellent.edu"
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Fee Status</label>
                    <select
                      value={editingStudent.feeStatus}
                      onChange={(e) => setEditingStudent({ ...editingStudent, feeStatus: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="Fully Paid">Fully Paid</option>
                      <option value="Paid Installment #1">Paid Installment #1</option>
                      <option value="Paid Installment #2">Paid Installment #2</option>
                      <option value="Pending ₹40k">Pending ₹40k</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Target Course</label>
                    <select
                      value={editingStudent.course}
                      onChange={(e) => setEditingStudent({ ...editingStudent, course: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="IIT-JEE Engineering">IIT-JEE Engineering</option>
                      <option value="NEET Premier 2026">NEET Premier 2026</option>
                      <option value="Foundation 10th">Foundation 10th</option>
                      <option value="CUET 2026">CUET 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-300 mb-1.5">Academic Class</label>
                    <select
                      value={editingStudent.class}
                      onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                      className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                    >
                      <option value="Class 12th Standard">Class 12th Standard</option>
                      <option value="Class 11th Standard">Class 11th Standard</option>
                      <option value="12th Pass / Dropper">12th Pass / Dropper</option>
                      <option value="Class 10th Foundation">Class 10th Foundation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Assign Coaching Batch</label>
                  <select
                    value={editingStudent.batch}
                    onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  >
                    {batches.map((b) => (
                      <option key={b._id} value={b.name}>
                        {b.name} - {b.tag}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1.5">Residential Address</label>
                  <textarea
                    rows={2}
                    value={editingStudent.address}
                    onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                    placeholder="Residential Address"
                    className="w-full p-3 bg-[#1C2237] border border-gray-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#7B3FE4]"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 p-3 border border-[#7B3FE4]/30 rounded-xl font-bold text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-[#7B3FE4] text-white rounded-xl font-bold shadow-lg hover:bg-[#682FD1]"
                  >
                    Update in MongoDB Atlas
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: LIVE WEBCAM CAMERA MODAL */}
        {showCameraModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#111625] text-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-purple-500/30 text-center shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#7B3FE4]" /> Live Webcam Photo Capture
                </h3>
                <button onClick={handleStopCamera} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-[#181F33] rounded-2xl overflow-hidden aspect-video border border-gray-800 flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleStopCamera}
                  className="flex-1 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold text-xs text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSnapPhoto}
                  className="flex-1 p-3 bg-[#7B3FE4] hover:bg-[#682FD1] rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4" /> Snap Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 5: STUDENT MONTHLY ATTENDANCE CALENDAR MODAL */}
        {showAttendanceModal && attendanceStudent && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#111625] text-white rounded-3xl p-7 max-w-md w-full space-y-5 shadow-2xl border border-gray-800">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 className="font-extrabold text-xl text-white">
                    {attendanceStudent.name}'s Attendance
                  </h3>
                  <p className="text-xs text-purple-400 font-semibold mt-0.5">
                    {attendanceStudent.rollNo || attendanceStudent.studentId || 'STU-2026-000013'}
                  </p>
                </div>
                <button onClick={() => setShowAttendanceModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Month Navigation */}
              <div className="bg-[#181F33] p-3.5 rounded-2xl border border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentMonth('July 2026')}
                  className="px-4 py-2 bg-[#232C47] hover:bg-gray-700 text-xs font-bold rounded-xl text-white transition-all"
                >
                  Prev
                </button>
                <span className="font-extrabold text-sm text-white tracking-wide">{currentMonth}</span>
                <button
                  onClick={() => setCurrentMonth('September 2026')}
                  className="px-4 py-2 bg-[#232C47] hover:bg-gray-700 text-xs font-bold rounded-xl text-white transition-all"
                >
                  Next
                </button>
              </div>

              {/* Day Headers (SUN - SAT) */}
              <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-extrabold text-gray-400 tracking-wider">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Monthly Days Grid */}
              {attendanceLoading ? (
                <div className="py-12 text-center text-xs font-bold text-purple-400">
                  Fetching attendance from MongoDB Atlas...
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells before Aug 1 (Aug 1 2026 is Saturday -> 6 empty cells) */}
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />

                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const dayStr = day < 10 ? `0${day}` : `${day}`;
                    const dateStr = `2026-08-${dayStr}`;
                    const rec = dbAttendanceRecords.find(r => r.date === dateStr || r.date?.includes(`-${dayStr}`));
                    const status = rec ? rec.status : null;

                    let statusBg = 'bg-[#1D253A] text-white border-gray-800/80';
                    let badgeDot = null;

                    if (status === 'Present' || status === 'present') {
                      statusBg = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
                      badgeDot = 'bg-emerald-400';
                    } else if (status === 'Absent' || status === 'absent') {
                      statusBg = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
                      badgeDot = 'bg-rose-500';
                    } else if (status === 'Late' || status === 'late') {
                      statusBg = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
                      badgeDot = 'bg-amber-400';
                    }

                    return (
                      <div
                        key={day}
                        className={`h-11 rounded-2xl border flex flex-col items-center justify-center font-extrabold text-xs transition-all ${statusBg}`}
                      >
                        <span>{day}</span>
                        {badgeDot && (
                          <span className={`w-1.5 h-1.5 rounded-full ${badgeDot} mt-0.5`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Status Legend (Exactly PRESENT, LATE, ABSENT) */}
              <div className="pt-2 border-t border-gray-800/80 flex items-center justify-center gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-300 uppercase text-[11px]">PRESENT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-gray-300 uppercase text-[11px]">LATE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-gray-300 uppercase text-[11px]">ABSENT</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
