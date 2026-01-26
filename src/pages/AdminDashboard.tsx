import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Check, X, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Phone, Video as VideoIcon, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// TypeScript interface for property submissions
interface PropertySubmission {
  id: string;
  user_id: string;
  submission_type: 'PG' | 'Flat';
  status: 'pending' | 'approved' | 'rejected';
  property_name: string;
  location_address: string;
  whatsapp_number?: string;
  description?: string;
  single_sharing_price?: number;
  double_sharing_price?: number;
  monthly_rent?: number;
  security_deposit?: string;
  mess_availability?: string;
  current_flatmates?: number;
  flatmates_required?: string;
  brokerage_required?: boolean;
  bhk_config?: string;
  selected_facilities?: string[];
  selected_amenities?: string[];
  image_urls: string[];
  video_url?: string | null;
  location_coordinates?: {
    lat: number;
    lng: number;
  } | null;
  submitted_at: string;
  created_at: string;
}

// Statistics interface
interface Stats {
  pending: number;
  approved: number;
  rejected: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<PropertySubmission[]>([]);
const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 });
const [loadingData, setLoadingData] = useState(true);
const [selectedSubmission, setSelectedSubmission] = useState<PropertySubmission | null>(null);
const [showDetailsDialog, setShowDetailsDialog] = useState(false);
const [showRejectDialog, setShowRejectDialog] = useState(false);
const [rejectReason, setRejectReason] = useState('');
const [isProcessing, setIsProcessing] = useState(false);

// Edit form states
const [showEditDialog, setShowEditDialog] = useState(false);
const [adminFields, setAdminFields] = useState({
  location_city: '',
  location_state: '',
  time_to_entrance_gate: '',
  time_to_main_market: '',
  show_distance_to_dtu: false,
  floor_number: null as number | null,
  verification_status: 'pending_verification',
  featured_amenities: [] as string[],
});

const fetchSubmissions = async () => {
    setLoadingData(true);
    try {
      // Fetch all submissions ordered by newest first
      const { data: allSubmissions, error } = await supabase
        .from('property_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter pending submissions
      const pending = allSubmissions?.filter(s => s.status === 'pending') || [];
      setSubmissions(pending);

      // Calculate statistics
      const stats = {
        pending: allSubmissions?.filter(s => s.status === 'pending').length || 0,
        approved: allSubmissions?.filter(s => s.status === 'approved').length || 0,
        rejected: allSubmissions?.filter(s => s.status === 'rejected').length || 0,
      };
      setStats(stats);

      console.log('Fetched submissions:', { pending: pending.length, stats });
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoadingData(false);
    }
  };
    // Open details dialog for a submission
  const handleViewDetails = (submission: PropertySubmission) => {
    setSelectedSubmission(submission);
    setShowDetailsDialog(true);
    console.log('Viewing submission:', submission);
  };

  // Reset admin fields to default values
const resetAdminFields = () => {
  setAdminFields({
    location_city: '',
    location_state: '',
    time_to_entrance_gate: '',
    time_to_main_market: '',
    show_distance_to_dtu: false,
    floor_number: null,
    verification_status: 'pending_verification',
    featured_amenities: [],
  });
};

// Open edit form dialog
const handleOpenEditForm = () => {
  if (!selectedSubmission) return;
  
  // Pre-fill some fields based on submission data
  setAdminFields({
    location_city: '', // Admin will fill this
    location_state: '', // Will auto-fill based on city
    time_to_entrance_gate: '',
    time_to_main_market: '',
    show_distance_to_dtu: false,
    floor_number: null,
    verification_status: 'pending_verification',
    featured_amenities: [], // Admin will select from submission amenities
  });
  
  // Close details dialog and open edit dialog
  setShowDetailsDialog(false);
  setShowEditDialog(true);
  
  console.log('📝 Opening edit form for:', selectedSubmission.property_name);
};

// Publish property with admin fields
const handlePublishProperty = async () => {
  if (!selectedSubmission) return;
  
  // Validate required fields
  if (!adminFields.location_city || !adminFields.verification_status) {
    toast({
      variant: "destructive",
      title: "Missing Required Fields",
      description: "Please fill in City and Verification Status before publishing.",
    });
    return;
  }

  setIsProcessing(true);
  try {
    console.log('📋 Publishing property with admin fields:', adminFields);

    // Prepare complete property data
    const propertyData = {
      // Basic Info (from user submission)
      title: selectedSubmission.property_name,
      description: selectedSubmission.description || null,
      type: selectedSubmission.submission_type,
      owner_phone: selectedSubmission.whatsapp_number || null,
      
      // Pricing - PG fields
      room_pricing_single: selectedSubmission.single_sharing_price || null,
      room_pricing_double: selectedSubmission.double_sharing_price || null,
      security_deposit: selectedSubmission.security_deposit || null,
      mess_included: selectedSubmission.mess_availability || null,
      
      // Pricing - Flat fields
      flat_rent: selectedSubmission.monthly_rent || null,
      current_flatmates: selectedSubmission.current_flatmates || null,
      flatmates_required: selectedSubmission.flatmates_required || null,
      brokerage: selectedSubmission.brokerage_required ? 'applicable' : 'not applicable',
      flat_size: selectedSubmission.bhk_config || null,
      
      // Features (from user submission)
      basic_facilities: selectedSubmission.selected_facilities || [],
      room_amenities: selectedSubmission.submission_type === 'PG' 
        ? (selectedSubmission.selected_amenities || [])
        : [],
      flat_amenities: selectedSubmission.submission_type === 'Flat' 
        ? (selectedSubmission.selected_amenities || [])
        : [],
      
      // Media (from user submission)
      images: selectedSubmission.image_urls || [],
      video: selectedSubmission.video_url || null,
      
      // Location (combine user + admin data)
      location_address: selectedSubmission.location_address || null,
      location_lat: selectedSubmission.location_coordinates?.lat || null,
      location_lng: selectedSubmission.location_coordinates?.lng || null,
      location_city: adminFields.location_city,
      location_state: adminFields.location_state,
      
      // Admin Fields (from edit form)
      time_to_entrance_gate: adminFields.time_to_entrance_gate || null,
      time_to_main_market: adminFields.time_to_main_market || null,
      show_distance_to_dtu: adminFields.show_distance_to_dtu,
      floor_number: adminFields.floor_number || null,
      verification_status: adminFields.verification_status,
      featured_amenities: adminFields.featured_amenities,
      
      // Status & Dates
      status: 'available', // ← LIVE on website!
      listed_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    console.log('💾 Inserting property:', propertyData);

    // Insert to properties table
    const { data: newProperty, error: insertError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      throw insertError;
    }

    console.log('✅ Property inserted:', newProperty);

    // Update submission status to approved
    const { error: updateError } = await supabase
      .from('property_submissions')
      .update({ 
        status: 'approved',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', selectedSubmission.id);

    if (updateError) {
      console.error('❌ Update error:', updateError);
      throw updateError;
    }

    console.log('✅ Submission marked as approved');

    // Show success message
    toast({
      title: "🎉 Property Published!",
      description: `${selectedSubmission.property_name} is now live on the website!`,
    });

    // Close dialogs and refresh
    setShowEditDialog(false);
    resetAdminFields();
    setSelectedSubmission(null);
    fetchSubmissions();

  } catch (error) {
    console.error('❌ Publish error:', error);
    toast({
      variant: "destructive",
      title: "Publishing Failed",
      description: error instanceof Error ? error.message : "Could not publish property.",
    });
  } finally {
    setIsProcessing(false);
  }
};

// Save property as draft (not published yet)
const handleSaveAsDraft = async () => {
  if (!selectedSubmission) return;

  setIsProcessing(true);
  try {
    console.log('💾 Saving as draft with admin fields:', adminFields);

    // Prepare property data (same as publish, but status = pending_details)
    const propertyData = {
      // Basic Info
      title: selectedSubmission.property_name,
      description: selectedSubmission.description || null,
      type: selectedSubmission.submission_type,
      owner_phone: selectedSubmission.whatsapp_number || null,
      
      // Pricing - PG fields
      room_pricing_single: selectedSubmission.single_sharing_price || null,
      room_pricing_double: selectedSubmission.double_sharing_price || null,
      security_deposit: selectedSubmission.security_deposit || null,
      mess_included: selectedSubmission.mess_availability || null,
      
      // Pricing - Flat fields
      flat_rent: selectedSubmission.monthly_rent || null,
      current_flatmates: selectedSubmission.current_flatmates || null,
      flatmates_required: selectedSubmission.flatmates_required || null,
      brokerage: selectedSubmission.brokerage_required ? 'applicable' : 'not applicable',
      flat_size: selectedSubmission.bhk_config || null,
      
      // Features
      basic_facilities: selectedSubmission.selected_facilities || [],
      room_amenities: selectedSubmission.submission_type === 'PG' 
        ? (selectedSubmission.selected_amenities || [])
        : [],
      flat_amenities: selectedSubmission.submission_type === 'Flat' 
        ? (selectedSubmission.selected_amenities || [])
        : [],
      
      // Media
      images: selectedSubmission.image_urls || [],
      video: selectedSubmission.video_url || null,
      
      // Location
      location_address: selectedSubmission.location_address || null,
      location_lat: selectedSubmission.location_coordinates?.lat || null,
      location_lng: selectedSubmission.location_coordinates?.lng || null,
      location_city: adminFields.location_city || null,
      location_state: adminFields.location_state || null,
      
      // Admin Fields (whatever you filled so far)
      time_to_entrance_gate: adminFields.time_to_entrance_gate || null,
      time_to_main_market: adminFields.time_to_main_market || null,
      show_distance_to_dtu: adminFields.show_distance_to_dtu,
      floor_number: adminFields.floor_number || null,
      verification_status: adminFields.verification_status,
      featured_amenities: adminFields.featured_amenities,
      
      // Status & Dates
      status: 'pending_details', // ← NOT live yet!
      listed_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    console.log('💾 Saving draft:', propertyData);

    // Insert to properties table
    const { data: newProperty, error: insertError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (insertError) {
      console.error('❌ Insert error:', insertError);
      throw insertError;
    }

    console.log('✅ Draft saved:', newProperty);

    // Update submission status to approved (but property not live)
    const { error: updateError } = await supabase
      .from('property_submissions')
      .update({ 
        status: 'approved',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', selectedSubmission.id);

    if (updateError) {
      console.error('❌ Update error:', updateError);
      throw updateError;
    }

    // Show success message
    toast({
      title: "💾 Saved as Draft",
      description: `${selectedSubmission.property_name} saved. Complete details in Supabase to publish.`,
    });

    // Close dialogs and refresh
    setShowEditDialog(false);
    resetAdminFields();
    setSelectedSubmission(null);
    fetchSubmissions();

  } catch (error) {
    console.error('❌ Save draft error:', error);
    toast({
      variant: "destructive",
      title: "Save Failed",
      description: error instanceof Error ? error.message : "Could not save draft.",
    });
  } finally {
    setIsProcessing(false);
  }
};

    // Approve submission and publish to properties table


    // Reject submission with reason
  const handleReject = async () => {
    if (!selectedSubmission || !rejectReason.trim()) {
      toast({
        variant: "destructive",
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection.",
      });
      return;
    }
    
    setIsProcessing(true);
    try {
      // Update submission status to rejected
      const { error } = await supabase
        .from('property_submissions')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectReason.trim(),
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', selectedSubmission.id);

      if (error) throw error;

      console.log('✅ Property rejected');

      // Show success message
      toast({
        title: "Submission Rejected",
        description: `${selectedSubmission.property_name} has been rejected.`,
      });

      // Close dialogs and refresh data
      setShowRejectDialog(false);
      setShowDetailsDialog(false);
      setSelectedSubmission(null);
      setRejectReason('');
      fetchSubmissions();

    } catch (error) {
      console.error('Error rejecting submission:', error);
      toast({
        variant: "destructive",
        title: "Rejection Failed",
        description: "Could not reject the property. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Get user metadata from Supabase
        const { data: { user: userData }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        // Check if user has is_admin flag
        const isAdminUser = userData?.app_metadata?.is_admin === true;
        
        if (!isAdminUser) {
          // Not an admin, redirect to home
          navigate('/');
          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

      // Fetch submissions from database
  

    checkAdminStatus();
  }, [user, navigate]);

    // Fetch submissions when component mounts and user is verified as admin
  useEffect(() => {
    if (isAdmin) {
      fetchSubmissions();
    }
  }, [isAdmin]);

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Verifying admin access...</div>
      </div>
    );
  }

  // Don't render anything if not admin (will redirect anyway)
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/60">Manage property submissions</p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="text-white border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {/* <div className="max-w-7xl mx-auto">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">Welcome, Admin!</CardTitle>
            <CardDescription className="text-white/60">
              Your admin dashboard is being set up. Check back soon!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white/80">
            <p>Features coming in the next steps:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>View all pending submissions</li>
              <li>Approve/reject property listings</li>
              <li>Edit submissions before approval</li>
              <li>View statistics and analytics</li>
            </ul>
          </CardContent>
        </Card>
      </div> */}

              {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pending Card */}
          <Card className="bg-yellow-500/10 border-yellow-500/20 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">Pending Review</CardTitle>
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stats.pending}</p>
              <p className="text-yellow-500/60 text-sm mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          {/* Approved Card */}
          <Card className="bg-green-500/10 border-green-500/20 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">Approved</CardTitle>
                <Check className="w-5 h-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stats.approved}</p>
              <p className="text-green-500/60 text-sm mt-1">Published listings</p>
            </CardContent>
          </Card>

          {/* Rejected Card */}
          <Card className="bg-red-500/10 border-red-500/20 backdrop-blur-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-sm font-medium">Rejected</CardTitle>
                <X className="w-5 h-5 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stats.rejected}</p>
              <p className="text-red-500/60 text-sm mt-1">Declined submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-white">Pending Submissions</CardTitle>
            <CardDescription className="text-white/60">
              Review and approve property listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                <p className="text-white/60 mt-4">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No pending submissions</p>
                <p className="text-white/40 text-sm mt-2">New submissions will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/80">Property Name</TableHead>
                      <TableHead className="text-white/80">Type</TableHead>
                      <TableHead className="text-white/80">Location</TableHead>
                      <TableHead className="text-white/80">Price</TableHead>
                      <TableHead className="text-white/80">Submitted</TableHead>
                      <TableHead className="text-white/80 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow 
                        key={submission.id}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <TableCell className="text-white font-medium">
                          {submission.property_name}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              submission.submission_type === 'PG' 
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }
                          >
                            {submission.submission_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white/60 max-w-xs truncate">
                          {submission.location_address || 'Not specified'}
                        </TableCell>
                        <TableCell className="text-white/80">
                          {submission.submission_type === 'PG' 
                            ? `₹${submission.single_sharing_price?.toLocaleString()}`
                            : `₹${submission.monthly_rent?.toLocaleString()}`
                          }
                        </TableCell>
                        <TableCell className="text-white/60">
                          {new Date(submission.submitted_at || submission.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-white border-white/20 hover:bg-white/10"
                              onClick={() => handleViewDetails(submission)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

            {/* Submission Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              <Badge 
                variant="outline"
                className={
                  selectedSubmission?.submission_type === 'PG' 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                }
              >
                {selectedSubmission?.submission_type}
              </Badge>
              {selectedSubmission?.property_name}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Submitted on {selectedSubmission && new Date(selectedSubmission.submitted_at || selectedSubmission.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              
              {/* Images Section */}
              {selectedSubmission?.image_urls && selectedSubmission.image_urls.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-green-500" />
                    Property Images ({selectedSubmission.image_urls.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedSubmission.image_urls.map((url, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10">
                        <img 
                          src={url} 
                          alt={`Property image ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Section */}
              {selectedSubmission?.video_url && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <VideoIcon className="w-5 h-5 text-green-500" />
                    Property Video
                  </h3>
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10">
                    <video 
                      controls 
                      className="w-full h-full"
                      src={selectedSubmission.video_url}
                    >
                      Your browser does not support video playback.
                    </video>
                  </div>
                </div>
              )}

              {/* Pricing Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  💰 Pricing Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSubmission?.submission_type === 'PG' ? (
                    <>
                      {selectedSubmission.single_sharing_price && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <p className="text-white/60 text-sm">Single Sharing</p>
                          <p className="text-2xl font-bold text-green-400">
                            ₹{selectedSubmission.single_sharing_price.toLocaleString()}/month
                          </p>
                        </div>
                      )}
                      {selectedSubmission.double_sharing_price && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                          <p className="text-white/60 text-sm">Double Sharing</p>
                          <p className="text-2xl font-bold text-green-400">
                            ₹{selectedSubmission.double_sharing_price.toLocaleString()}/month
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white/60 text-sm">Monthly Rent</p>
                      <p className="text-2xl font-bold text-green-400">
                        ₹{selectedSubmission?.monthly_rent?.toLocaleString()}/month
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Facilities & Amenities */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  ✨ Features
                </h3>
                <div className="space-y-3">
                  {selectedSubmission?.selected_facilities && selectedSubmission.selected_facilities.length > 0 && (
                    <div>
                      <p className="text-white/60 text-sm mb-2">Facilities</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.selected_facilities.map((facility, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedSubmission?.selected_amenities && selectedSubmission.selected_amenities.length > 0 && (
                    <div>
                      <p className="text-white/60 text-sm mb-2">Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.selected_amenities.map((amenity, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              {selectedSubmission?.location_address && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-500" />
                    Location
                  </h3>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-white/80">{selectedSubmission.location_address}</p>
                  </div>
                </div>
              )}

              {/* Contact */}
              {selectedSubmission?.whatsapp_number && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-500" />
                    Contact Information
                  </h3>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-white/60 text-sm">WhatsApp Number</p>
                    <p className="text-lg font-semibold text-white">{selectedSubmission.whatsapp_number}</p>
                  </div>
                </div>
              )}

            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-white/10">
                <Button
        onClick={() => setShowRejectDialog(true)}
        disabled={isProcessing}
        variant="outline"
        className="text-red-400 border-red-500/20 hover:bg-red-500/10 disabled:opacity-50"
        >
        <X className="w-4 h-4 mr-2" />
        Reject
        </Button>
            <Button
            onClick={handleOpenEditForm}
            disabled={isProcessing}
              className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50"
            >

                    {isProcessing ? (
            <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Approving...
            </>
        ) : (
            <>
            <Check className="w-4 h-4 mr-2" />
            Approve & Edit Details
            </>
        )}

            </Button>
          </div>
        </DialogContent>
      </Dialog>

            {/* Reject Reason Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-gray-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-400">Reject Submission</DialogTitle>
            <DialogDescription className="text-white/60">
              Please provide a reason for rejecting this property listing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm mb-2 block">
                Rejection Reason <span className="text-red-400">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g., Images are unclear, pricing seems incorrect, location not verified..."
                className="w-full min-h-[120px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
              />
              <p className="text-white/40 text-xs mt-2">
                This reason will be saved and can be sent to the property owner.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6">
            <Button
              onClick={() => {
                setShowRejectDialog(false);
                setRejectReason('');
              }}
              variant="outline"
              disabled={isProcessing}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={isProcessing || !rejectReason.trim()}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Rejecting...
                </>
              ) : (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Confirm Rejection
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

            {/* Edit Admin Fields Dialog */}
      <Dialog open={showEditDialog} onOpenChange={(open) => {
        if (!open) {
          resetAdminFields();
        }
        setShowEditDialog(open);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-white/10 text-white overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-3">
              📝 Complete Property Details
              {selectedSubmission && (
                <Badge 
                  variant="outline"
                  className={
                    selectedSubmission.submission_type === 'PG' 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }
                >
                  {selectedSubmission.submission_type}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Fill in the admin-only fields before publishing this property
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[65vh] pr-4">
            <div className="space-y-6">
              
              {/* User Submitted Data Summary (Read-Only) */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3">📋 Submission Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/60">Property Name:</p>
                    <p className="text-white font-medium">{selectedSubmission?.property_name}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Type:</p>
                    <p className="text-white font-medium">{selectedSubmission?.submission_type}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Location:</p>
                    <p className="text-white font-medium">{selectedSubmission?.location_address}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Contact:</p>
                    <p className="text-white font-medium">{selectedSubmission?.whatsapp_number}</p>
                  </div>
                </div>
              </div>

              {/* Admin Fields Form */}
              <div className="space-y-5">
                <h3 className="text-lg font-semibold text-white">🔧 Admin Fields (Required)</h3>

                {/* Location Details */}
                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium block">
                    📍 City <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={adminFields.location_city}
                    onChange={(e) => {
                      const city = e.target.value;
                      let state = '';
                      
                      // Auto-fill state based on city
                      if (city === 'Delhi') state = 'Delhi';
                      else if (city === 'Noida' || city === 'Greater Noida') state = 'Uttar Pradesh';
                      else if (city === 'Gurgaon' || city === 'Faridabad') state = 'Haryana';
                      
                      setAdminFields({ 
                        ...adminFields, 
                        location_city: city,
                        location_state: state 
                      });
                    }}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="" className="bg-gray-800">Select City</option>
                    <option value="Delhi" className="bg-gray-800">Delhi</option>
                    <option value="Noida" className="bg-gray-800">Noida</option>
                    <option value="Greater Noida" className="bg-gray-800">Greater Noida</option>
                    <option value="Gurgaon" className="bg-gray-800">Gurgaon</option>
                    <option value="Faridabad" className="bg-gray-800">Faridabad</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium block">
                    🗺️ State (Auto-filled)
                  </label>
                  <input
                    type="text"
                    value={adminFields.location_state}
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/60 cursor-not-allowed"
                  />
                </div>

                {/* Time/Distance Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium block">
                      🚶 Time to DTU Entrance Gate
                    </label>
                    <input
                      type="text"
                      value={adminFields.time_to_entrance_gate}
                      onChange={(e) => setAdminFields({ ...adminFields, time_to_entrance_gate: e.target.value })}
                      placeholder="e.g., 5 min walk"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium block">
                      🛒 Time to Main Market
                    </label>
                    <input
                      type="text"
                      value={adminFields.time_to_main_market}
                      onChange={(e) => setAdminFields({ ...adminFields, time_to_main_market: e.target.value })}
                      placeholder="e.g., 10 min by rickshaw"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Show DTU Distance Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="show_dtu_distance"
                    checked={adminFields.show_distance_to_dtu}
                    onChange={(e) => setAdminFields({ ...adminFields, show_distance_to_dtu: e.target.checked })}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500"
                  />
                  <label htmlFor="show_dtu_distance" className="text-white/80 text-sm font-medium">
                    🎓 Show "Distance to DTU" on property card
                  </label>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium block">
                      🏢 Floor Number
                    </label>
                    <input
                      type="number"
                      value={adminFields.floor_number || ''}
                      onChange={(e) => setAdminFields({ ...adminFields, floor_number: e.target.value ? parseInt(e.target.value) : null })}
                      placeholder="e.g., 2"
                      min="0"
                      max="20"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium block">
                      ✅ Verification Status <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={adminFields.verification_status}
                      onChange={(e) => setAdminFields({ ...adminFields, verification_status: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                      <option value="pending_verification" className="bg-gray-800">Pending Verification</option>
                      <option value="verified" className="bg-gray-800">Verified</option>
                      <option value="verification_failed" className="bg-gray-800">Verification Failed</option>
                    </select>
                  </div>
                </div>

                {/* Featured Amenities */}
                {/* <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium block">
                    ⭐ Featured Amenities (Select 2-3 to highlight on card)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(selectedSubmission?.selected_amenities || []).slice(0, 9).map((amenity, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          adminFields.featured_amenities.includes(amenity)
                            ? 'bg-green-500/20 border-green-500/50'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={adminFields.featured_amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Add amenity (max 3)
                              if (adminFields.featured_amenities.length < 3) {
                                setAdminFields({
                                  ...adminFields,
                                  featured_amenities: [...adminFields.featured_amenities, amenity]
                                });
                              }
                            } else {
                              // Remove amenity
                              setAdminFields({
                                ...adminFields,
                                featured_amenities: adminFields.featured_amenities.filter(a => a !== amenity)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500"
                        />
                        <span className="text-white/80 text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-white/40 text-xs">
                    {adminFields.featured_amenities.length}/3 selected
                  </p>
                </div> */}

                {/* Featured Amenities */}
<div className="space-y-3">
  <label className="text-white/80 text-sm font-medium block">
    ⭐ Featured Amenities (Select 2-3 to highlight on card)
  </label>
  
  {/* For PG: Show both facilities and amenities */}
  {selectedSubmission?.submission_type === 'PG' && (
    <>
      {/* Basic Facilities Section */}
      {selectedSubmission?.selected_facilities && selectedSubmission.selected_facilities.length > 0 && (
        <div className="space-y-2">
          <p className="text-white/60 text-xs font-medium">🏠 Basic Facilities</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedSubmission.selected_facilities.map((facility, idx) => (
              <label
                key={`facility-${idx}`}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  adminFields.featured_amenities.includes(facility)
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={adminFields.featured_amenities.includes(facility)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Add facility (max 3)
                      if (adminFields.featured_amenities.length < 3) {
                        setAdminFields({
                          ...adminFields,
                          featured_amenities: [...adminFields.featured_amenities, facility]
                        });
                      }
                    } else {
                      // Remove facility
                      setAdminFields({
                        ...adminFields,
                        featured_amenities: adminFields.featured_amenities.filter(a => a !== facility)
                      });
                    }
                  }}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500"
                />
                <span className="text-white/80 text-sm">{facility}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Room Amenities Section */}
      {selectedSubmission?.selected_amenities && selectedSubmission.selected_amenities.length > 0 && (
        <div className="space-y-2">
          <p className="text-white/60 text-xs font-medium">🛏️ Room Amenities</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {selectedSubmission.selected_amenities.map((amenity, idx) => (
              <label
                key={`amenity-${idx}`}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  adminFields.featured_amenities.includes(amenity)
                    ? 'bg-green-500/20 border-green-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={adminFields.featured_amenities.includes(amenity)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Add amenity (max 3)
                      if (adminFields.featured_amenities.length < 3) {
                        setAdminFields({
                          ...adminFields,
                          featured_amenities: [...adminFields.featured_amenities, amenity]
                        });
                      }
                    } else {
                      // Remove amenity
                      setAdminFields({
                        ...adminFields,
                        featured_amenities: adminFields.featured_amenities.filter(a => a !== amenity)
                      });
                    }
                  }}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500"
                />
                <span className="text-white/80 text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  )}

  {/* For Flat: Show only amenities */}
  {selectedSubmission?.submission_type === 'Flat' && (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {(selectedSubmission?.selected_amenities || []).map((amenity, idx) => (
        <label
          key={idx}
          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
            adminFields.featured_amenities.includes(amenity)
              ? 'bg-green-500/20 border-green-500/50'
              : 'bg-white/5 border-white/10 hover:border-white/20'
          }`}
        >
          <input
            type="checkbox"
            checked={adminFields.featured_amenities.includes(amenity)}
            onChange={(e) => {
              if (e.target.checked) {
                // Add amenity (max 3)
                if (adminFields.featured_amenities.length < 3) {
                  setAdminFields({
                    ...adminFields,
                    featured_amenities: [...adminFields.featured_amenities, amenity]
                  });
                }
              } else {
                // Remove amenity
                setAdminFields({
                  ...adminFields,
                  featured_amenities: adminFields.featured_amenities.filter(a => a !== amenity)
                });
              }
            }}
            className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500"
          />
          <span className="text-white/80 text-sm">{amenity}</span>
        </label>
      ))}
    </div>
  )}

  <p className="text-white/40 text-xs">
    {adminFields.featured_amenities.length}/3 selected
  </p>
</div>

              </div>

            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-white/10">
            <Button
              onClick={() => {
                setShowEditDialog(false);
                resetAdminFields();
                setShowDetailsDialog(true); // Go back to details view
              }}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              ← Back
            </Button>

            <div className="flex gap-3">
              <Button
  onClick={handleSaveAsDraft}
  disabled={isProcessing}
  variant="outline"
  className="text-white border-white/20 hover:bg-white/10 disabled:opacity-50"
>
  {isProcessing ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Saving...
    </>
  ) : (
    <>
      💾 Save as Draft
    </>
  )}
</Button>

              <Button
  onClick={handlePublishProperty}
  disabled={isProcessing || !adminFields.location_city || !adminFields.verification_status}
  className="bg-gradient-to-r from-green-500 to-emerald-400 text-white hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50"
>
  {isProcessing ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Publishing...
    </>
  ) : (
    <>
      <Check className="w-4 h-4 mr-2" />
      Publish Now
    </>
  )}
</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    
    </div>
  );
};

export default AdminDashboard;