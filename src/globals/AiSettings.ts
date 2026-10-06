import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'

// Settings for the site's AI assistant. Admin-only: the API key is never readable by anyone else.
export const AiSettings: GlobalConfig = {
  slug: 'ai-settings',
  label: { fa: 'دستیار هوشمند (AI)', en: 'AI assistant' },
  admin: { group: { fa: 'تنظیمات', en: 'Settings' } },
  access: { read: isAdmin, update: isAdmin },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: false, label: { fa: 'دستیار روی سایت فعال باشد', en: 'Show the assistant on the site' } },
    {
      name: 'apiKey', type: 'text', label: { fa: 'کلید API انتروپیک (Anthropic)', en: 'Anthropic API key' },
      admin: { description: 'از console.anthropic.com → API Keys بسازید و اینجا بچسبانید. فقط مدیر کل آن را می‌بیند.' },
    },
    {
      name: 'model', type: 'select', defaultValue: 'claude-haiku-4-5', label: { fa: 'مدل', en: 'Model' },
      options: [
        { value: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 (سریع و ارزان — پیشنهادی)' },
        { value: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 (دقیق‌تر، گران‌تر)' },
      ],
    },
    { type: 'row', fields: [
      { name: 'perVisitorDaily', type: 'number', defaultValue: 30, min: 1, label: { fa: 'سقف پیام روزانه برای هر بازدیدکننده', en: 'Daily messages per visitor' } },
      { name: 'totalDaily', type: 'number', defaultValue: 1500, min: 1, label: { fa: 'سقف کل پیام‌های روزانه (کنترل هزینه)', en: 'Total daily messages (cost cap)' } },
    ] },
    { name: 'extraInstructions', type: 'textarea', label: { fa: 'دستورالعمل اضافه برای دستیار', en: 'Extra instructions' }, admin: { description: 'مثلاً تخفیف ویژه، ساعات پاسخ‌گویی، یا نکته‌ای که دستیار باید بداند.' } },
  ],
}
