#!/usr/bin/env python3
"""
Generate phone mockup with event ticket for WaoCard landing page
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Color scheme matching the WaoCard brand
COLORS = {
    'primary': '#FF9500',
    'primary_dark': '#E08600',
    'black': '#000000',
    'dark_gray': '#1A1A1A',
    'gray': '#333333',
    'light_gray': '#666666',
    'white': '#FFFFFF',
    'glass': '#0F0F0F',
    'text_primary': '#FFFFFF',
    'text_secondary': '#CCCCCC',
}

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient_background(width, height, color1, color2, direction='vertical'):
    """Create a gradient background"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    if direction == 'vertical':
        for i in range(height):
            ratio = i / height
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(0, i), (width, i)], fill=(r, g, b))
    else:  # horizontal
        for i in range(width):
            ratio = i / width
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.line([(i, 0), (i, height)], fill=(r, g, b))
    
    return img

def draw_phone_frame(width, height):
    """Create a phone frame"""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Phone outer frame
    frame_color = hex_to_rgb(COLORS['dark_gray'])
    draw.rounded_rectangle([20, 40, width-20, height-40], radius=40, fill=frame_color)
    
    # Screen area
    screen_color = hex_to_rgb(COLORS['black'])
    draw.rounded_rectangle([35, 80, width-35, height-80], radius=25, fill=screen_color)
    
    # Home indicator
    indicator_color = hex_to_rgb(COLORS['light_gray'])
    draw.rounded_rectangle([width//2-30, height-60, width//2+30, height-55], radius=3, fill=indicator_color)
    
    return img

def create_phone_mockup_with_event_ticket():
    """Create phone mockup showing event ticket interface"""
    width, height = 300, 600
    
    # Create background
    bg = create_gradient_background(width, height, hex_to_rgb(COLORS['black']), hex_to_rgb(COLORS['dark_gray']))
    
    # Create phone frame
    phone = draw_phone_frame(width, height)
    
    # Composite phone frame on background
    bg.paste(phone, (0, 0), phone)
    
    # Draw screen content
    draw = ImageDraw.Draw(bg)
    
    # Load fonts
    try:
        font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 12)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
        font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
    except:
        font_small = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_large = ImageFont.load_default()
        font_title = ImageFont.load_default()
    
    # Header
    draw.text((50, 100), "WaoCard", fill=hex_to_rgb(COLORS['primary']), font=font_title)
    draw.text((50, 125), "Digital Wallet", fill=hex_to_rgb(COLORS['text_secondary']), font=font_small)
    
    # Event ticket card
    ticket_y = 160
    ticket_height = 200
    
    # Ticket background with gradient
    ticket_bg = create_gradient_background(220, ticket_height, 
                                         hex_to_rgb(COLORS['primary']), 
                                         hex_to_rgb(COLORS['primary_dark']))
    
    # Paste ticket on main image
    bg.paste(ticket_bg, (40, ticket_y))
    
    # Ticket content
    draw.text((55, ticket_y + 20), "THEME PARK", fill=hex_to_rgb(COLORS['black']), font=font_medium)
    draw.text((55, ticket_y + 45), "Adventure World", fill=hex_to_rgb(COLORS['black']), font=font_large)
    draw.text((55, ticket_y + 80), "Date: June 21, 2025", fill=hex_to_rgb(COLORS['black']), font=font_small)
    draw.text((55, ticket_y + 100), "Time: 10:00 AM", fill=hex_to_rgb(COLORS['black']), font=font_small)
    draw.text((55, ticket_y + 120), "Gate: A", fill=hex_to_rgb(COLORS['black']), font=font_small)
    
    # QR code placeholder
    qr_size = 50
    qr_x = 190
    qr_y = ticket_y + 130
    draw.rectangle([qr_x, qr_y, qr_x + qr_size, qr_y + qr_size], fill=hex_to_rgb(COLORS['black']))
    
    # Add some pattern to QR code placeholder
    for i in range(0, qr_size, 4):
        for j in range(0, qr_size, 4):
            if (i + j) % 8 == 0:
                draw.rectangle([qr_x + i, qr_y + j, qr_x + i + 2, qr_y + j + 2], 
                             fill=hex_to_rgb(COLORS['white']))
    
    # Additional ticket details
    draw.text((55, ticket_y + 140), "Admit One", fill=hex_to_rgb(COLORS['black']), font=font_small)
    draw.text((55, ticket_y + 160), "Ticket #: 12345", fill=hex_to_rgb(COLORS['black']), font=font_small)
    
    # Bottom section - other cards preview
    cards_y = ticket_y + ticket_height + 20
    draw.text((50, cards_y), "Other Cards", fill=hex_to_rgb(COLORS['text_primary']), font=font_medium)
    
    # Small card previews
    card_preview_y = cards_y + 30
    for i, card_name in enumerate(['Credit Card', 'Loyalty Card']):
        card_x = 50 + i * 100
        draw.rounded_rectangle([card_x, card_preview_y, card_x + 80, card_preview_y + 50], 
                             radius=8, fill=hex_to_rgb(COLORS['glass']))
        draw.text((card_x + 5, card_preview_y + 15), card_name, 
                 fill=hex_to_rgb(COLORS['text_secondary']), font=font_small)
    
    # Bottom navigation
    nav_y = height - 120
    draw.rectangle([40, nav_y, width-40, nav_y + 50], fill=hex_to_rgb(COLORS['glass']))
    draw.text((60, nav_y + 15), "Cards", fill=hex_to_rgb(COLORS['text_secondary']), font=font_small)
    draw.text((120, nav_y + 15), "Tickets", fill=hex_to_rgb(COLORS['primary']), font=font_small)
    draw.text((180, nav_y + 15), "Wallet", fill=hex_to_rgb(COLORS['text_secondary']), font=font_small)
    
    return bg

def main():
    """Generate phone mockup with event ticket"""
    print("Generating phone mockup with event ticket...")
    
    phone_mockup = create_phone_mockup_with_event_ticket()
    phone_mockup.save("placeholder.png")
    
    print("Phone mockup with event ticket generated successfully!")
    print("Saved as: placeholder.png")

if __name__ == "__main__":
    main()
