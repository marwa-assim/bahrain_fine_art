import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Plus, 
  Upload, 
  Mail, 
  Phone, 
  MapPin,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('contact');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [suggestForm, setSuggestForm] = useState({
    landmarkName: '',
    category: '',
    location: '',
    description: '',
    historicalSignificance: '',
    yearBuilt: '',
    submitterName: '',
    submitterEmail: '',
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Set active tab from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'suggest') {
      setActiveTab('suggest');
    }
  }, [searchParams]);

  const categories = [
    { id: 'historical', name: { en: 'Historical', ar: 'تاريخية' } },
    { id: 'religious', name: { en: 'Religious', ar: 'دينية' } },
    { id: 'cultural', name: { en: 'Cultural', ar: 'ثقافية' } },
    { id: 'modern', name: { en: 'Modern', ar: 'حديثة' } },
    { id: 'natural', name: { en: 'Natural', ar: 'طبيعية' } },
    { id: 'archaeological', name: { en: 'Archaeological', ar: 'أثرية' } }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleSuggestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setSuggestForm({
        landmarkName: '',
        category: '',
        location: '',
        description: '',
        historicalSignificance: '',
        yearBuilt: '',
        submitterName: '',
        submitterEmail: '',
        images: []
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSuggestForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setSuggestForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`text-center ${isRTL ? 'font-arabic' : ''}`}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Have questions about Bahrain\'s heritage or want to suggest a new landmark? We\'d love to hear from you.'
                : 'لديك أسئلة حول تراث البحرين أو تريد اقتراح معلم جديد؟ نحن نحب أن نسمع منك.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="contact" className={`flex items-center space-x-2 ${isRTL ? 'font-arabic' : ''}`}>
              <MessageCircle className="h-4 w-4" />
              <span>{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</span>
            </TabsTrigger>
            <TabsTrigger value="suggest" className={`flex items-center space-x-2 ${isRTL ? 'font-arabic' : ''}`}>
              <Plus className="h-4 w-4" />
              <span>{language === 'en' ? 'Suggest Landmark' : 'اقتراح معلم'}</span>
            </TabsTrigger>
          </TabsList>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className={`${isRTL ? 'font-arabic text-right' : ''}`}>
                    {language === 'en' ? 'Send us a Message' : 'أرسل لنا رسالة'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className={`text-green-800 dark:text-green-200 ${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!'}
                        </span>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                      </Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Email Address' : 'عنوان البريد الإلكتروني'}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Subject' : 'الموضوع'}
                      </Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        required
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Message' : 'الرسالة'}
                      </Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        required
                        rows={5}
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {language === 'en' ? 'Sending...' : 'جاري الإرسال...'}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className={`${isRTL ? 'font-arabic text-right' : ''}`}>
                      {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}>
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          heritage@bahrain.gov.bh
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}>
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {language === 'en' ? 'Phone' : 'الهاتف'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          +973 1234 5678
                        </div>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse font-arabic' : ''}`}>
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {language === 'en' ? 'Address' : 'العنوان'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {language === 'en' ? 'Ministry of Culture, Manama, Bahrain' : 'وزارة الثقافة، المنامة، البحرين'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className={`text-center ${isRTL ? 'font-arabic' : ''}`}>
                      <div className="text-3xl mb-3">🏛️</div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        {language === 'en' ? 'Help Us Preserve Heritage' : 'ساعدنا في الحفاظ على التراث'}
                      </h3>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {language === 'en' 
                          ? 'Your suggestions and feedback help us maintain and expand our heritage collection.'
                          : 'اقتراحاتك وملاحظاتك تساعدنا في الحفاظ على مجموعة التراث وتوسيعها.'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Suggest Landmark Tab */}
          <TabsContent value="suggest" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className={`${isRTL ? 'font-arabic text-right' : ''}`}>
                  {language === 'en' ? 'Suggest a New Landmark' : 'اقتراح معلم جديد'}
                </CardTitle>
                <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {language === 'en' 
                    ? 'Help us expand our collection by suggesting landmarks that showcase Bahrain\'s rich heritage.'
                    : 'ساعدنا في توسيع مجموعتنا من خلال اقتراح معالم تعرض التراث الغني للبحرين.'
                  }
                </p>
              </CardHeader>
              <CardContent>
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className={`text-green-800 dark:text-green-200 ${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Landmark suggestion submitted successfully!' : 'تم إرسال اقتراح المعلم بنجاح!'}
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSuggestSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="landmarkName" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Landmark Name' : 'اسم المعلم'}
                      </Label>
                      <Input
                        id="landmarkName"
                        value={suggestForm.landmarkName}
                        onChange={(e) => setSuggestForm(prev => ({ ...prev, landmarkName: e.target.value }))}
                        required
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Category' : 'الفئة'}
                      </Label>
                      <select
                        id="category"
                        value={suggestForm.category}
                        onChange={(e) => setSuggestForm(prev => ({ ...prev, category: e.target.value }))}
                        required
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${isRTL ? 'text-right font-arabic' : ''}`}
                      >
                        <option value="">
                          {language === 'en' ? 'Select a category' : 'اختر فئة'}
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name[language]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Location' : 'الموقع'}
                      </Label>
                      <Input
                        id="location"
                        value={suggestForm.location}
                        onChange={(e) => setSuggestForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                        placeholder={language === 'en' ? 'e.g., Manama, Bahrain' : 'مثال: المنامة، البحرين'}
                      />
                    </div>

                    <div>
                      <Label htmlFor="yearBuilt" className={`${isRTL ? 'font-arabic' : ''}`}>
                        {language === 'en' ? 'Year Built (if known)' : 'سنة البناء (إن وجدت)'}
                      </Label>
                      <Input
                        id="yearBuilt"
                        value={suggestForm.yearBuilt}
                        onChange={(e) => setSuggestForm(prev => ({ ...prev, yearBuilt: e.target.value }))}
                        className={`${isRTL ? 'text-right font-arabic' : ''}`}
                        placeholder={language === 'en' ? 'e.g., 1850' : 'مثال: 1850'}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description" className={`${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'en' ? 'Description' : 'الوصف'}
                    </Label>
                    <Textarea
                      id="description"
                      value={suggestForm.description}
                      onChange={(e) => setSuggestForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                      rows={4}
                      className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      placeholder={language === 'en' 
                        ? 'Describe the landmark, its architecture, and current condition...'
                        : 'صف المعلم وعمارته وحالته الحالية...'
                      }
                    />
                  </div>

                  {/* Historical Significance */}
                  <div>
                    <Label htmlFor="historicalSignificance" className={`${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'en' ? 'Historical Significance' : 'الأهمية التاريخية'}
                    </Label>
                    <Textarea
                      id="historicalSignificance"
                      value={suggestForm.historicalSignificance}
                      onChange={(e) => setSuggestForm(prev => ({ ...prev, historicalSignificance: e.target.value }))}
                      required
                      rows={3}
                      className={`${isRTL ? 'text-right font-arabic' : ''}`}
                      placeholder={language === 'en' 
                        ? 'Explain why this landmark is important to Bahrain\'s heritage...'
                        : 'اشرح لماذا هذا المعلم مهم لتراث البحرين...'
                      }
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label className={`${isRTL ? 'font-arabic' : ''}`}>
                      {language === 'en' ? 'Images (Optional)' : 'الصور (اختيارية)'}
                    </Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Upload Images' : 'رفع الصور'}
                      </label>
                    </div>

                    {/* Image Preview */}
                    {suggestForm.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {suggestForm.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">{image.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submitter Information */}
                  <div className="border-t pt-6">
                    <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {language === 'en' ? 'Your Information' : 'معلوماتك'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="submitterName" className={`${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'en' ? 'Your Name' : 'اسمك'}
                        </Label>
                        <Input
                          id="submitterName"
                          value={suggestForm.submitterName}
                          onChange={(e) => setSuggestForm(prev => ({ ...prev, submitterName: e.target.value }))}
                          required
                          className={`${isRTL ? 'text-right font-arabic' : ''}`}
                        />
                      </div>

                      <div>
                        <Label htmlFor="submitterEmail" className={`${isRTL ? 'font-arabic' : ''}`}>
                          {language === 'en' ? 'Your Email' : 'بريدك الإلكتروني'}
                        </Label>
                        <Input
                          id="submitterEmail"
                          type="email"
                          value={suggestForm.submitterEmail}
                          onChange={(e) => setSuggestForm(prev => ({ ...prev, submitterEmail: e.target.value }))}
                          required
                          className={`${isRTL ? 'text-right font-arabic' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guidelines */}
                  <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div className={`text-sm ${isRTL ? 'font-arabic text-right' : ''}`}>
                          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                            {language === 'en' ? 'Submission Guidelines' : 'إرشادات التقديم'}
                          </h4>
                          <ul className={`text-amber-800 dark:text-amber-200 space-y-1 ${isRTL ? 'text-right' : ''}`}>
                            <li>• {language === 'en' ? 'Ensure the landmark has historical or cultural significance' : 'تأكد من أن المعلم له أهمية تاريخية أو ثقافية'}</li>
                            <li>• {language === 'en' ? 'Provide accurate location and historical information' : 'قدم معلومات دقيقة عن الموقع والتاريخ'}</li>
                            <li>• {language === 'en' ? 'Include high-quality images if available' : 'أدرج صوراً عالية الجودة إن وجدت'}</li>
                            <li>• {language === 'en' ? 'All submissions will be reviewed by our heritage experts' : 'ستتم مراجعة جميع المقترحات من قبل خبراء التراث'}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {language === 'en' ? 'Submitting...' : 'جاري الإرسال...'}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {language === 'en' ? 'Submit Suggestion' : 'إرسال الاقتراح'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactPage;

